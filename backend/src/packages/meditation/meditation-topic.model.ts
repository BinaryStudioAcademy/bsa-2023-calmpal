import { Model, type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

import {
  MeditationEntriesTableColumn,
  MeditationTopicsRelation,
  MeditationTopicsTableColumn,
} from './libs/enums/enums.js';
import { MeditationEntryModel } from './meditation-entry.model.js';

class MeditationTopicModel extends AbstractModel {
  public name!: string;

  public static override get tableName(): string {
    return DatabaseTableName.MEDITATION_TOPICS;
  }

  public static relationMappings(): RelationMappings {
    return {
      [MeditationTopicsRelation.ENTRY]: {
        relation: Model.HasManyRelation,
        modelClass: MeditationEntryModel,
        join: {
          from: `${DatabaseTableName.MEDITATION_TOPICS}.${MeditationTopicsTableColumn.ID}`,
          to: `${DatabaseTableName.MEDITATION_ENTRIES}.${MeditationEntriesTableColumn.TOPIC_ID}`,
        },
      },
    };
  }
}

export { MeditationTopicModel };
