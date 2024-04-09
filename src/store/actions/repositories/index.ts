import { PageInfo } from "../../../models/generics";
import {
  ERepositoriesActions,
  GetRepositoriesAction,
  GetRepositoryInfoAction,
  RepositoriesSuccess,
  RepositoriesError,
  Repository,
  RepositoryInfo,
} from "../../../models/repositories";

export const getRepositories = (
  query?: string,
  cursor?: string
): GetRepositoriesAction => ({
  type: ERepositoriesActions.GET_REPOSITORIES,
  payload: { query, cursor },
});

export const getRepositoryInfo = (
  name: string,
  owner: string
): GetRepositoryInfoAction => ({
  type: ERepositoriesActions.GET_REPOSITORY_INFO,
  payload: { name, owner },
});

export const repositoriesApiSuccess = (
  data: {
    repositories?: Repository[];
    activeRepositoryInfo?: RepositoryInfo;
    pageInfo?: PageInfo;
  },
  dispatchedType: ERepositoriesActions
): RepositoriesSuccess => ({
  type: ERepositoriesActions.API_SUCCESS,
  payload: data,
  dispatchedType,
});

export const repositoriesApiError = (error: Error): RepositoriesError => ({
  type: ERepositoriesActions.API_ERROR,
  payload: error,
});
