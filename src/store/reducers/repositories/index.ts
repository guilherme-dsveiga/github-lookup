import {
  ERepositoriesActions,
  RepositoriesActionTypes,
  RepositoriesState,
} from "../../../models/repositories";

const initialState: RepositoriesState = {
  pageInfo: { endCursor: "", hasNextPage: false },
  repositories: [],
  activeRepository: null,
  activeRepositoryOwner: "",
  activeRepositoryName: "",
  searchQuery: "",
  loading: false,
  error: null,
  activeRepositoryLoading: false,
  activeRepositoryError: null,
};

export const Repositories = (
  state = initialState,
  action: RepositoriesActionTypes
) => {
  switch (action.type) {
    case ERepositoriesActions.GET_REPOSITORIES:
      return {
        ...state,
        loading: true,
        searchQuery: action.payload.query
          ? action.payload.query
          : state.searchQuery,
        repositories:
          action.payload.query === state.searchQuery ? state.repositories : [],
      };
    case ERepositoriesActions.GET_REPOSITORY_INFO:
      return {
        ...state,
        activeRepositoryLoading: true,
        activeRepositoryName: action.payload.name,
        activeRepositoryOwner: action.payload.owner,
      };

    case ERepositoriesActions.API_SUCCESS:
      switch (action.dispatchedType) {
        case ERepositoriesActions.GET_REPOSITORIES:
          return {
            ...state,
            loading: false,
            error: null,
            repositories: [
              ...state.repositories,
              ...action.payload.repositories!,
            ],
            pageInfo: action.payload.pageInfo,
          };
        case ERepositoriesActions.GET_REPOSITORY_INFO:
          return {
            ...state,
            activeRepository: action.payload.activeRepositoryInfo,
            activeRepositoryLoading: false,
          };
        default:
          return { ...state };
      }
    case ERepositoriesActions.API_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
