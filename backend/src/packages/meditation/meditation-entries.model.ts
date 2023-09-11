import { Model, type RelationMappings } from 'objection';

import { type ContentType } from '#libs/enums/enums.js';
import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';
import { type ValueOf } from '#libs/types/types.js';

import {
  MeditationEntriesRelation,
  MeditationEntriesTableColumn,
  MeditationTopicsTableColumn,
} from './libs/enums/enums.js';
import { MeditationTopicModel } from './meditation-topics.model.js';

class MeditationEntriesModel extends AbstractModel {
  public mediaUrl!: string;

  public contentType!: ValueOf<typeof ContentType>;

  public static override get tableName(): string {
    return DatabaseTableName.MEDITATION_ENTRIES;
  }

  public static relationMappings(): RelationMappings {
    return {
      [MeditationEntriesRelation.TOPIC]: {
        relation: Model.BelongsToOneRelation,
        modelClass: MeditationTopicModel,
        join: {
          from: `${DatabaseTableName.MEDITATION_ENTRIES}.${MeditationEntriesTableColumn.TOPIC_ID}`,
          to: `${DatabaseTableName.MEDITATION_TOPICS}.${MeditationTopicsTableColumn.ID}`,
        },
      },
    };
  }
}

export { MeditationEntriesModel };
