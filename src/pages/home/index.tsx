import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { getRepositories } from "../../store/actions";
import ScrollDetector from "../../components/scrollDetector";
import Repository from "../../components/repository";
import Loading from "../../components/loading";
import {
  GithubLogo,
  LinkedinLogo,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import RepositoryModal from "../../components/repositoryModal";

function Home() {
  const dispatch = useDispatch();
  const { repositories, pageInfo, loading } = useSelector(
    (state: RootState) => ({
      repositories: state.Repositories.repositories,
      activeRepository: state.Repositories.activeRepository,
      pageInfo: state.Repositories.pageInfo,
      loading: state.Repositories.loading,
    })
  );

  const ref = useRef<HTMLInputElement | null>(null);

  const handleBottomReached = () => {
    if (pageInfo && pageInfo.hasNextPage) {
      const query = ref.current?.value;
      dispatch(getRepositories(query, pageInfo.endCursor));
    }
  };

  const handleGetRepositories = (query: string) => {
    dispatch(getRepositories(query));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (e.target as HTMLFormElement).query?.value;
    handleGetRepositories(query);
  };

  return (
    <div className="px-4 sm:px-10 pt-10 pb-5 min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex flex-col mx-auto w-fit text-stone-50 mb-10">
          <h1 className="text-3xl font-semibold text-center">Github Lookup</h1>
          <form className="flex gap-2 mt-4" onSubmit={handleSearch}>
            <input
              ref={ref}
              className="px-2 py-1 w-52 sm:w-80 focus:outline-none text-lg rounded border-stone-600 bg-stone-950 text-stone-50"
              placeholder="Digite aqui..."
              name="query"
            />
            <button
              className="flex items-center justify-center py-1 px-2 bg-orange-600 hover:bg-black rounded transition-all"
              type="submit"
            >
              <MagnifyingGlass
                size={16}
                weight="bold"
                className="text-stone-50"
              />
            </button>
          </form>
        </div>
        <div
          className={`flex flex-col max-w-md w-full overflow-x-hidden mx-auto gap-4 relative ${
            repositories.length > 0
              ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[200px] after:bg-gradient-to-b after:from-transparent after:to-60% after:to-stone-900"
              : ""
          } `}
        >
          {repositories.map((repo) => (
            <Repository key={repo.id} repo={repo} />
          ))}
          <div
            className={
              repositories.length > 0
                ? "absolute left-1/2 -translate-x-1/2 bottom-20 z-50"
                : ""
            }
          >
            {loading ? <Loading /> : null}
          </div>
          <ScrollDetector onBottomReached={handleBottomReached} />
        </div>
      </div>
      <div>
        <div className="h-[1px] w-full bg-stone-700" />
        <div className="flex gap-2 items-center mt-3">
          <a
            href="https://www.linkedin.com/in/guilherme-dsveiga"
            target="_blank"
          >
            <LinkedinLogo
              className="text-stone-50 cursor-pointer hover:text-stone-400 transition-all"
              size={32}
            />
          </a>
          <a href="https://www.github.com/guilherme-dsveiga" target="_blank">
            <GithubLogo
              className="text-stone-50 cursor-pointer hover:text-stone-400 transition-all"
              size={32}
            />
          </a>
        </div>
      </div>
      <RepositoryModal />
    </div>
  );
}

export default Home;
