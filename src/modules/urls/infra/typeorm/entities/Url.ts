import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('urls')
export class Url {
  @PrimaryColumn()
  id: string;

  @Column()
  original_url: string;

  @Column()
  name: string;

  @Column()
  clicks: number;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
