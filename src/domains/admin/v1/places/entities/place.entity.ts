import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum PlaceType {
  COUPON_EXCHANGE = "COUPON_EXCHANGE",
  E_SIGNATURE_CERTIFICATE = "E_SIGNATURE_CERTIFICATE",
}

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "enum",
    enum: PlaceType,
    default: PlaceType.COUPON_EXCHANGE,
  })
  type: PlaceType

  @Column({type: "json"})
  address: { en: string, ar: string }

  @Column("simple-array")
  phones: string[]

  @Column({ type: 'text' })
  iframeSrc: string;

  @Column({ default: false })
  isPublished: boolean

  @ManyToOne((type) => User, (user) => user.places)
  createdBy: User
}
