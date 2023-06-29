import axios, { AxiosResponse } from 'axios';
import { AllTagsInterface, UserTagsInterface } from '../interfaces/tags.model';
import { AllMessages } from '../interfaces/messages.model';
import Cookies from 'js-cookie';

const authToken: string | undefined = Cookies.get('auth_token');

// Avoir tous les messages
export async function GetAllMessages(): Promise<AllMessages> {
  try {
    const response: AxiosResponse<AllMessages> = await axios.get<AllMessages>(import.meta.env.VITE_BASE_URL + '/message/get/feed', {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    const messagesFeed: AllMessages = response.data;
    return messagesFeed;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log('Aucun message trouvé.');
    } else {
      console.error('Erreur lors de la récupération des messages :', error);
    }
    throw error;
  }
}

// Avoir tous les tags
export async function GetAllTags(): Promise<AllTagsInterface> {
  try {
    const response: AxiosResponse<AllTagsInterface> = await axios.get<AllTagsInterface>(import.meta.env.VITE_BASE_URL + '/tag/getAll', {
      headers: {
        Authorization: 'Bearer ' + authToken,
        Accept: 'application/json',
      },
    });
    const allTags: AllTagsInterface = response.data;
    return allTags;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log('Aucun tag trouvé.');
    } else {
      console.error("Erreur lors de la récupération des tags de l'utilisateur :", error);
    }
    throw error;
  }
}

// Avoir les tags utilisateurs
export async function GetUserTags(): Promise<UserTagsInterface> {
  try {
    const response: AxiosResponse<UserTagsInterface> = await axios.get<UserTagsInterface>(import.meta.env.VITE_BASE_URL + '/tagUser/get', {
      headers: {
        Authorization: 'Bearer ' + authToken,
        Accept: 'application/json',
      },
    });
    const tagsUser: UserTagsInterface = response.data;
    return tagsUser;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log('Aucun tag trouvé.');
    } else {
      console.error("Erreur lors de la récupération des tags de l'utilisateur :", error);
    }
    throw error;
  }
}

// Interaction avec un tag
export async function InteractionTag(tagId: string, changeState: string, authToken: string): Promise<UserTagsInterface> {
  try {
    const response: AxiosResponse<UserTagsInterface> = await axios.get<UserTagsInterface>(
      `${import.meta.env.VITE_BASE_URL}/tagUser/${tagId}/change_state?state=${changeState}`,
      {
        headers: {
          Authorization: 'Bearer ' + authToken,
          Accept: 'application/json',
        },
      }
    );
    const interactUserTag: UserTagsInterface = response.data;
    return interactUserTag;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log('Le tag ne peut pas être refusé...');
    } else {
      console.error('Erreur lors du refus du tag :', error);
    }
    throw error;
  }
}
