/**
 * @author nstCactus
 * @date 2018-11-30 08:50
 */

export interface DirectusMediaModelConstructorOptions {
  id: number;
  status: number;

  name: string;
  title: string;

  location: string;
  caption: string;
  type: string;
  charset: string;
  tags: string;

  width: number;
  height: number;
  size: number;
  embed_id?: number;

  user: number;

  date_uploaded: Date;
  storage_adapter: string;
  url: string;
  thumbnail_url: string;
  old_thumbnail_url: string;
  html: string;
}

export default class DirectusMediaModel {
  public id: number;
  public status: number;

  public name: string;
  public title: string;

  public location: string;
  public caption: string;
  public type: string;
  public charset: string;
  public tags: string;

  public width: number;
  public height: number;
  public size: number;
  public embedId?: number;

  public user: number;

  public dateUploaded: Date;
  public storageAdapter: string;
  public url: string;
  public thumbnailUrl: string;
  public oldThumbnailUrl: string;
  public html: string;

  constructor(options: DirectusMediaModelConstructorOptions) {
    this.id = options.id;
    this.status = options.status;
    this.name = options.name;
    this.title = options.title;
    this.location = options.location;
    this.caption = options.caption;
    this.type = options.type;
    this.charset = options.charset;
    this.tags = options.tags;
    this.width = options.width;
    this.height = options.height;
    this.size = options.size;
    this.embedId = options.embed_id;
    this.user = options.user;
    this.dateUploaded = options.date_uploaded;
    this.storageAdapter = options.storage_adapter;
    this.url = options.url;
    this.thumbnailUrl = options.thumbnail_url;
    this.oldThumbnailUrl = options.old_thumbnail_url;
    this.html = options.html;
  }

  public static instanciatePhotos (options: DirectusMediaModelConstructorOptions[]) {
    const photos:DirectusMediaModel[] = [];
    options.forEach(options => {
      photos.push(new DirectusMediaModel(options));
    });

    return photos;
  }
}
