import { Update, OpType } from "../types/update";

class UpdateUtils {
  public getUpdates(updates: Update[]) {
    return updates.map((update) => {
      switch (update.opType) {
        case OpType.SET:
          return this.getSetUpdate(update);
        case OpType.ADD:
          return this.getAddUpdate(update);
        case OpType.GET:
          return this.getGetUpdate(update);
        case OpType.REMOVE:
          return this.getRemoveUpdate(update);
        default:
          throw new Error("Invalid update operation");
      }
    });
  }

  private getSetUpdate(update: Update) {
    return {
      $set: {
        [update.field]: update.value,
      },
    };
  }

  private getAddUpdate(update: Update) {
    return {
      $push: {
        [update.field]: update.value,
      },
    };
  }

  private getGetUpdate(update: Update) {
    return {
      $push: {
        [update.field]: update.value,
      },
    };
  }

  private getRemoveUpdate(update: Update) {
    return {
      $pull: {
        [update.field]: update.value,
      },
    };
  }

  private getReorderUpdate(update: Update) {
    return {
      $set: {
        [update.field]: update.value,
      },
    };
  }
}

export default new UpdateUtils();
