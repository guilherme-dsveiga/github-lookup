import Modal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/actions";
import { RootState } from "../../store/reducers";
import { useEffect, useMemo } from "react";
import Loading from "../loading";
import {
  ClockCounterClockwise,
  GitBranch,
  GitFork,
  GitPullRequest,
  Notepad,
  WarningCircle,
} from "@phosphor-icons/react";
import Language from "../language";
import Markdown from "../markdown";
import Tag from "../tag";

function RepositoryModal() {
  const dispatch = useDispatch();

  const {
    isModalOpen,
    activeRepository,
    activeRepositoryLoading,
    activeRepositoryError,
  } = useSelector((state: RootState) => ({
    isModalOpen: state.Modal.open,
    activeRepository: state.Repositories.activeRepository,
    activeRepositoryLoading: state.Repositories.activeRepositoryLoading,
    activeRepositoryError: state.Repositories.activeRepositoryError,
  }));

  const handleModalToggle = () => {
    dispatch(toggleModal());
  };

  const markdownContent = useMemo(() => {
    const readMe = activeRepository?.defaultBranchRef.target.tree.entries.find(
      (v) => v.name === "README.md"
    );

    return readMe?.object.text;
  }, [activeRepository]);

  return (
    <Modal show={isModalOpen} toggle={handleModalToggle}>
      <>
        {activeRepositoryLoading ? (
          <Loading variant="dark" />
        ) : activeRepository ? (
          <div className="text-stone-50">
            <div className="flex sm:flex-row flex-col sm:gap-4 items-center justify-between">
              <h2 className="sm:text-2xl text-lg font-semibold">
                {activeRepository.owner.login}/{activeRepository.name}
              </h2>
              <div className="flex items-center gap-2 sm:mt-0 mt-2 sm:w-auto w-full justify-center">
                <Tag
                  Icon={<GitFork size={20} className="text-stone-600" />}
                  amount={activeRepository.forks.totalCount}
                  label={"forks"}
                />
                <Tag
                  Icon={<GitPullRequest size={20} className="text-stone-600" />}
                  amount={activeRepository.pullRequests.totalCount}
                  label={"pull requests"}
                />
                <div className="items-center gap-2 xs:hidden flex">
                  <Tag
                    Icon={
                      <WarningCircle size={20} className="text-stone-600" />
                    }
                    amount={activeRepository.issues.totalCount}
                    label={"issues"}
                  />
                  <Tag
                    Icon={
                      <ClockCounterClockwise
                        size={20}
                        className="text-stone-600"
                      />
                    }
                    amount={
                      activeRepository.defaultBranchRef.target.history
                        .totalCount
                    }
                    label={"commits"}
                  />
                </div>
              </div>
            </div>
            <div className="mt-1">
              {activeRepository?.primaryLanguage ? (
                <Language primaryLanguage={activeRepository.primaryLanguage} />
              ) : null}
            </div>
            <div className="mt-1 xs:text-sm text-xs text-stone-500">
              {activeRepository.description}
            </div>
            {markdownContent ? (
              <div className="my-5">
                <div className="bg-stone-950 px-2 py-1 rounded flex items-center gap-2 w-fit">
                  <Notepad size={20} className="text-stone-50" />
                  <h3 className="font-semibold xs:text-base text-sm">README</h3>
                </div>
                <div className="mt-2 max-h-[35vh] rounded overflow-y-auto p-4 bg-stone-950">
                  <Markdown content={markdownContent} />
                </div>
              </div>
            ) : null}

            <div className="items-center mt-2 gap-2 hidden xs:flex">
              <Tag
                Icon={<WarningCircle size={20} className="text-stone-600" />}
                amount={activeRepository.issues.totalCount}
                label={"issues"}
              />
              <Tag
                Icon={
                  <ClockCounterClockwise size={20} className="text-stone-600" />
                }
                amount={
                  activeRepository.defaultBranchRef.target.history.totalCount
                }
                label={"commits"}
              />
            </div>
          </div>
        ) : null}
      </>
    </Modal>
  );
}

export default RepositoryModal;
