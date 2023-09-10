import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '#libs/packages/database/database.js';

import {
  MeditationEntriesTableColumn,
  MeditationRelation,
  MeditationTopicsTableColumn,
} from './libs/enums/enums.js';
import { MeditationTopicModel } from './meditation-topics.model.js';

class MeditationEntriesModel extends AbstractModel {
  public audioUrl!: string;

  public static override get tableName(): string {
    return DatabaseTableName.MEDITATION_ENTRIES;
  }

  public static relationMappings(): RelationMappings {
    return {
      [MeditationRelation.TOPIC]: {
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