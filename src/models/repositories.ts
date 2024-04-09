import { Edge, PageInfo } from "./generics";

export type Repository = {
  name: string;
  description: string;
  url: string;
  id: string;
  owner: {
    avatarUrl: string;
    login: string;
  };
  primaryLanguage?: {
    color: string;
    name: string;
  };
};

export type RepositoryDetails = Repository & {};

export type RepositoryEdge = Edge<Repository> & {
  cursor: string;
};

export type RepositoriesState = {
  repositories: Repository[];
  activeRepository: RepositoryInfo | null;
  activeRepositoryName: string;
  activeRepositoryOwner: string;
  activeRepositoryLoading: boolean;
  activeRepositoryError: string | null;
  loading: boolean;
  error: string | null;
  pageInfo: PageInfo;
  searchQuery: string;
};

export enum ERepositoriesActions {
  GET_REPOSITORIES = "@repositories/GET_REPOSITORIES",
  GET_REPOSITORY_INFO = "@repositories/GET_REPOSITORY_INFO",
  CLEAR_PAGEINFO = "@repositories/CLEAR_PAGEINFO",
  API_SUCCESS = "@repositories/API_SUCCESS",
  API_ERROR = "@repositories/API_ERROR",
}

export type GetRepositoriesPayload = {
  query?: string;
  cursor?: string;
};

export type GetRepositoryInfoPayload = {
  name: string;
  owner: string;
};

export type GetRepositoriesAction = {
  type: ERepositoriesActions.GET_REPOSITORIES;
  payload: GetRepositoriesPayload;
};

export type GetRepositoryInfoAction = {
  type: ERepositoriesActions.GET_REPOSITORY_INFO;
  payload: {
    name: string;
    owner: string;
  };
};

export type GetRepositoriesResponse = {
  search: {
    repositoryCount: number;
    edges: RepositoryEdge[];
    pageInfo: PageInfo;
  };
};

export type GetRepositoryInfoResponse = {
  repository: RepositoryInfo;
};

export type RepositoryInfo = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  owner: {
    login: string;
  };
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  stargazers: {
    totalCount: number;
  };
  forks: {
    totalCount: number;
  };
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      };
      tree: {
        entries: {
          name: string;
          object: {
            text: string;
          };
        }[];
      };
    };
  };
  issues: {
    totalCount: number;
  };
  pullRequests: {
    totalCount: number;
  };
};

export type RepositoriesSuccess = {
  type: ERepositoriesActions.API_SUCCESS;
  payload: {
    repositories?: Repository[];
    activeRepositoryInfo?: RepositoryInfo;
    pageInfo?: PageInfo;
  };
  dispatchedType: ERepositoriesActions;
};

export type RepositoriesError = {
  type: ERepositoriesActions.API_ERROR;
  payload: Error;
};

export type RepositoriesActionTypes =
  | GetRepositoriesAction
  | GetRepositoryInfoAction
  | RepositoriesSuccess
  | RepositoriesError;
