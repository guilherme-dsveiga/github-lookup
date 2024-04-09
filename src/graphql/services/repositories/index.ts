import {
  GetRepositoriesPayload,
  GetRepositoriesResponse,
  GetRepositoryInfoResponse,
} from "../../../models/repositories";
import { client } from "../../client";
import {
  GET_REPOSITORIES_QUERY,
  GET_REPOSITORY_INFO_QUERY,
} from "../../querries/repositories";

export const getRepositories = async (query: string, cursor?: string) => {
  try {
    const { data } = await client.query<
      GetRepositoriesResponse,
      GetRepositoriesPayload
    >({
      query: GET_REPOSITORIES_QUERY,
      variables: {
        query: `in:name,description ${query}`,
        cursor,
      },
    });
    const repositories = data.search.edges.map((edge) => edge.node);
    const pageInfo = data.search.pageInfo;
    return { repositories, pageInfo };
  } catch (error) {
    throw new Error("Erro ao resgatar lista de repositórios");
  }
};

export const getRepositoryInfo = async (name: string, owner: string) => {
  try {
    const { data } = await client.query<GetRepositoryInfoResponse>({
      query: GET_REPOSITORY_INFO_QUERY,
      variables: {
        name,
        owner,
      },
    });
    const activeRepositoryInfo = data.repository;
    return { activeRepositoryInfo };
  } catch (error) {
    throw new Error("Erro ao resgatar informações do repositório");
  }
};
