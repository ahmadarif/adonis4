'use strict'

const Env = use('Env')
const Storage = require('@google-cloud/storage')
const Drive = use('Drive')
const Helpers = use('Helpers')

/**
 * Service to interact with Google Cloud Storage
 *
 * Dependencies:
 * - Google Cloud Storage : npm i -S @google-cloud/storage
 * - Adonis Drive         : adonis install @adonisjs/drive
 *
 * Other services : https://github.com/googleapis/nodejs-storage/blob/master/samples/files.js
 */
class GcsService {
  constructor () {
    console.log('dipanggil')
    if (!Env.get('GCS_KEY_FILE_NAME')) throw new Error('GCS_KEY_FILE_NAME not found')

    this.Storage = new Storage({
      keyFilename: Env.get('GCS_KEY_FILE_NAME')
    })
  }

  /**
   * Create a bucket
   * @param {string} bucket
   */
  async createBucket (bucket) {
    await this.Storage.createBucket(bucket)
  }

  /**
   * Upload a file to the bucket
   *
   * @param {string} bucket Bucket name
   * @param {string} file Object file
   * @param {string} directory Directory name in GCS
   * @param {boolean} isPublic File publicly
   *
   * @returns {string} File URL
   */
  async upload (bucket, file, directory = null, isPublic = true) {
    // Move uploaded file to tmp directory
    const filename = `${new Date().getTime()}-${file.clientName}`
    const fullPath = Helpers.tmpPath(filename)
    await Drive.move(file.tmpPath, fullPath)

    // Set custom option
    const option = {}
    if (isPublic) option.public = true
    if (directory) {
      directory = (directory + '/').replace(/\/\//g, '/')
      option.destination = directory + filename
    }

    // Upload to GCS
    await this.Storage.bucket(bucket).upload(fullPath, option)

    // Delete tmp file
    await Drive.delete(fullPath)

    // Return file URL
    const name = directory ? option.destination : filename
    return this._getFileURL(bucket, name)
  }

  /**
   * Delete file from the bucket.
   *
   * @param {string} bucket
   * @param {string} filename Full path (Directory + Filename)
   */
  async delete (bucket, filename) {
    await this.Storage.bucket(bucket).file(filename).delete()
  }

  /**
   * Move this file to another location. By default, this will rename the file
   * and keep it in the same bucket, but you can choose to move it to another
   * Bucket by providing a Bucket or File object or a URL beginning with "gs://".
   *
   * @param {string} bucket
   * @param {string} srcFilename
   * @param {string} destFilename
   */
  async move (bucket, srcFilename, destFilename) {
    await this.Storage.bucket(bucket).file(srcFilename).move(destFilename)
  }

  /**
   * Generate file URL
   *
   * @param {string} bucket Bucket name
   * @param {string} name File name
   *
   * @returns {string} File URL
   */
  _getFileURL (bucket, name) {
    return `https://storage.googleapis.com/${bucket}/${name}`
  }
}

module.exports = new GcsService()
