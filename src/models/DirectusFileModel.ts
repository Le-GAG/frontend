import {Fields, Model} from '@vuex-orm/core';
import UserModel from '@/models/UserModel';

export default class DirectusFileModel extends Model
{
  static entity = 'directus_file';

  static fields(): Fields
  {
    return {
      id:                this.attr(null),
      charset:           this.string(''),
      checksum:          this.string(''),
      data:              this.attr(null),
      description:       this.string(''),
      duration:          this.number(0),
      embed:             this.attr(null),
      filename_disk:     this.string(''),
      filename_download: this.string(''),
      filesize:          this.number(0),
      folder:            this.attr(null),
      height:            this.number(0),
      location:          this.string(''),
      metadata:          this.attr(null),
      private_hash:      this.string(''),
      storage:           this.string(''),
      tags:              this.attr(null),
      title:             this.string(''),
      type:              this.string(''),
      uploaded_by:       this.belongsTo(UserModel, 'uploaded_by_id'),
      uploaded_by_id:    this.attr(null),
      uploaded_on:       this.attr(new Date()),
      width:             this.number(0),
    };
  }

  id!: number;
  charset!: string;
  checksum!: string;
  data!: any;
  description!: string;
  duration!: number;
  embed!: any;
  filename_disk!: string;
  filename_download!: string;
  filesize!: number;
  folder!: any;
  height!: number;
  location!: string;
  metadata!: any;
  private_hash!: string;
  storage!: string;
  tags!: any[];
  title!: string;
  type!: string;
  uploaded_by!: string;
  uploaded_by_id!: number;
  uploaded_on!: string;
  width!: number;
}
