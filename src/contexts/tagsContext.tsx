import React, { createContext, useState, ReactNode } from 'react';
import TagsInterface from '../interfaces/tags.model';

export const DeletedTagsContext = createContext<Array<TagsInterface>>([]);
export const UpdateDeletedTagsContext = createContext<((tags: Array<TagsInterface>) => void) | undefined>(undefined);

export const DeletedTagsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deletedTags, setDeletedTags] = useState<Array<TagsInterface>>([]);

  const updateDeletedTags = (tags: Array<TagsInterface>) => {
    setDeletedTags(tags);
  };

  return (
    <DeletedTagsContext.Provider value={deletedTags}>
      <UpdateDeletedTagsContext.Provider value={updateDeletedTags}>{children}</UpdateDeletedTagsContext.Provider>
    </DeletedTagsContext.Provider>
  );
};
