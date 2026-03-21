import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SignatureType } from "../enums/signature-type";
import { PublishStatus } from "src/core/common/enums/publish-status.enum";
import { Translation } from "src/core/common/types/translation.type";
import { Searchable } from "src/core/search/searchable.decorator";
import { SearchHrefBuilder } from "src/core/search/search-href.builder";

@Searchable({
  index: 'global',
  type: 'signature_file',
  pick: ['name.en', 'name.ar'],
  extra: () => ({
    href: SearchHrefBuilder.forSignatureFile()
  }),
  condition: (entity: SignatureFile) => entity.status === PublishStatus.Published,
})
@Entity('signature_files')
export class SignatureFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  name: Translation;

  @Column({ type: 'json' })
  url: Translation;

  @Column({ type: 'smallint', default: 0 })
  order: number;

  @Column({ type: 'enum', enum: SignatureType, nullable: true })
  type?: SignatureType;

  @Column({ type: 'enum', enum: PublishStatus, default: PublishStatus.Draft })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
