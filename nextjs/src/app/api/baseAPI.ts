import { Update } from "@/backend/types/update";
import UpdateUtils from "@/backend/utils/update";
import { Collection, getModel, getUserId } from "./apiUtils";

class BaseAPI {
  collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  private async getModel(request: Request) {
    const model = await getModel(request, { collection: this.collection });
    if (!model) {
      throw new Error(`Model not found for ${this.collection}`);
    }
    return model;
  }

  public async create(request: Request, data: TSAny) {
    const model = await this.getModel(request);
    const modifiedBy = await getUserId(request);
    const document = await model.create({ ...data, modifiedBy });
    return document?.toJSON() as any;
  }

  public async update(request: Request, id: string, updates: Update[]) {
    const model = await this.getModel(request);
    const modifiedBy = await getUserId(request);
    const updatePayload = UpdateUtils.getUpdates(updates);

    const data = {
      ...updatePayload[0],
      modifiedBy,
    };
    const document = await model.findByIdAndUpdate(id, data, {
      new: true,
    });
    return document?.toJSON() as any;
  }

  public async find(request: Request) {
    const model = await this.getModel(request);
    const documents = await model.find({}).sort({ createdAt: -1 });
    return documents?.map((d) => d.toJSON());
  }

  public async findById(request: Request, id: string) {
    const model = await this.getModel(request);
    const documents = await model.findById(id);
    return documents?.toJSON() as any;
  }

  public async findByIdAndUpdate(request: Request, id: string, data: TSAny) {
    const model = await this.getModel(request);
    const modifiedBy = await getUserId(request);
    const documents = await model.findByIdAndUpdate(id, {
      ...data,
      modifiedBy,
    });
    return documents?.toJSON() as any;
  }

  public async deleteById(request: Request, id: string) {
    const model = await this.getModel(request);
    const deleteBy = await getUserId(request);
    await model.deleteById(id, deleteBy);
    return true;
  }
}

export default BaseAPI;
