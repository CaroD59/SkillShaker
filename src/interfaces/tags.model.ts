export default interface TagsInterface {
  name: string;
  id: number;
  audience: number;
}

export interface AllTagsInterface {
  tags: TagsInterface[];
}

export interface UserTagsInterface {
  myTags: TagsInterface[];
  refusedTags: TagsInterface[];
  suggTags: TagsInterface[];
}
