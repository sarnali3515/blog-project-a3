import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  // Filter
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((field) => delete queryObj[field]);

    if (queryObj.filter) {
      const authorId = queryObj.filter;
      this.modelQuery = this.modelQuery.find({
        author: authorId,
      } as FilterQuery<T>);
    } else {
      this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    }
    return this;
  }

  // Sort
  sort() {
    const sortBy = this.query.sortBy || 'createdAt';
    const sortOrder = this.query.sortOrder === 'asc' ? '' : '-';
    const sort = `${sortOrder}${sortBy}`;
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }
}

export default QueryBuilder;
