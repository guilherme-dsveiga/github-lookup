import { useDispatch } from "react-redux";
import { Repository as RepositoryType } from "../../models/repositories";
import { getRepositoryInfo, toggleModal } from "../../store/actions";
import Language from "../language";

type RepositoryProps = {
  repo: RepositoryType;
};

function Repository({ repo }: RepositoryProps) {
  const dispatch = useDispatch();

  const handleRepositoryDetails = () => {
    dispatch(toggleModal());
    dispatch(getRepositoryInfo(repo.name, repo.owner.login));
  };

  return (
    <div
      key={repo.id}
      className="shadow p-4 rounded bg-stone-800 text-stone-50 flex flex-col max-w-[720px] hover:scale-[1.01] transition-all cursor-pointer"
      onClick={handleRepositoryDetails}
    >
      <div className="flex items-center  justify-between">
        <div>
          <h2 className="font-semibold text-white text-xl sm:text-3xl leading-none">
            {repo.name}
          </h2>
        </div>

        <a
          className="flex items-center gap-2"
          href={`https://github.com/${repo.owner.login}`}
          target="_blank"
        >
          <p className=" text-stone-400 hover:text-stone-500 sm:text-base text-xs transition-all">
            {repo.owner.login}
          </p>
          <div className="sm:w-10 w-5 object-contain">
            <img className="rounded" src={repo.owner.avatarUrl} />
          </div>
        </a>
      </div>
      {repo.primaryLanguage ? (
        <Language primaryLanguage={repo.primaryLanguage} />
      ) : null}
      <p className="mt-5 sm:text-base text-sm text-wrap text-stone-100">
        {repo.description}
      </p>
    </div>
  );
}

export default Repository;
