/**
 * @author nstCactus
 * @date 2018-11-30 08:50
 */

export interface DirectusMediaModelConstructorOptions
{
  id: number,
  storage: string,
  filename: string,
  title: string,
  type: string,
  uploaded_by: number,
  uploaded_on: Date,
  charset: string,
  filesize: number,
  width: number,
  height: number,
  duration: number,
  embed: any,
  folder: any,
  description: string,
  location: string,
  tags: any[],
  metadata: any,
  checksum: string,
  data: {
    full_url: string,
    url: string,
    thumbnails: DirectusMediaThumbnail[],
  },
}

export interface DirectusMediaThumbnail{
  url: string,
  relative_url: string,
  dimension: string,
  width: number,
  height: number,
}

export default class DirectusMediaModel
{
  public id: number;
  storage: string;
  filename: string;
  title: string;
  type: string;
  uploadedBy: number;
  uploadedOn: Date;
  charset: string;
  filesize: number;
  width: number;
  height: number;
  duration: number;
  embed: string;
  folder: any;
  description: string;
  location: string;
  tags: any[];
  metadata: any;
  checksum: string;
  fullUrl: string;
  url: string;
  thumbnails: any;

  constructor(options: DirectusMediaModelConstructorOptions)
  {
    this.id          = options.id;
    this.storage     = options.storage;
    this.filename    = options.filename;
    this.title       = options.title;
    this.type        = options.type;
    this.uploadedBy  = options.uploaded_by;
    this.uploadedOn  = new Date(options.uploaded_on);
    this.charset     = options.charset;
    this.filesize    = options.filesize;
    this.width       = options.width;
    this.height      = options.height;
    this.duration    = options.duration;
    this.embed       = options.embed;
    this.folder      = options.folder;
    this.description = options.description;
    this.location    = options.location;
    this.tags        = options.tags;
    this.metadata    = options.metadata;
    this.checksum    = options.checksum;
    this.fullUrl     = options.data.full_url;
    this.url         = options.data.url;
    this.thumbnails  = [];

    if (options.data.thumbnails) {
      for (const thumbnail of options.data.thumbnails) {
        this.thumbnails.push({
          url:         thumbnail.url,
          relativeUrl: thumbnail.relative_url,
          dimension:   thumbnail.dimension,
          width:       thumbnail.width,
          height:      thumbnail.height,
        });
      }
    }
  }

  getThumbnailUrl(mode: string, width: number, height: number)
  {
    for (const thumbnail of this.thumbnails) {
      if (thumbnail.dimension == `${width}x${height}`) {
        return thumbnail.url;
      }
    }

    return null;
  }
}
