import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  ERepositoriesActions,
  GetRepositoriesAction,
  GetRepositoryInfoAction,
} from "../../../models/repositories";
import { repositoriesApiError, repositoriesApiSuccess } from "../../actions";
import {
  getRepositories,
  getRepositoryInfo,
} from "../../../graphql/services/repositories";
import { RootState } from "../../reducers";

function* getRepositoriesSaga(
  action: GetRepositoriesAction
): Generator<any, void, any> {
  try {
    const query = yield select(
      (state: RootState) => state.Repositories.searchQuery
    );

    const repositories = yield call(
      getRepositories,
      query,
      action.payload.cursor
    );
    yield put(repositoriesApiSuccess(repositories, action.type));
  } catch (error) {
    yield put(repositoriesApiError(error as Error));
  }
}

function* getRepositoryInfoSaga(
  action: GetRepositoryInfoAction
): Generator<any, void, any> {
  try {
    const name = yield select(
      (state: RootState) => state.Repositories.activeRepositoryName
    );
    const owner = yield select(
      (state: RootState) => state.Repositories.activeRepositoryOwner
    );
    const activeRepositoryInfo = yield call(getRepositoryInfo, name, owner);
    yield put(repositoriesApiSuccess(activeRepositoryInfo, action.type));
  } catch (error) {
    yield put(repositoriesApiError(error as Error));
  }
}

function* watchGetRepositoryInfoSaga(): Generator {
  yield takeLatest(
    ERepositoriesActions.GET_REPOSITORY_INFO,
    getRepositoryInfoSaga
  );
}

function* watchGetRepositoriesSaga(): Generator {
  yield takeLatest(ERepositoriesActions.GET_REPOSITORIES, getRepositoriesSaga);
}

export default function* repositoriesSaga() {
  yield all([watchGetRepositoriesSaga(), watchGetRepositoryInfoSaga()]);
}
