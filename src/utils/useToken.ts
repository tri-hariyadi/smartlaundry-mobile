import Token, {IToken} from 'src/utils/token';

const useToken = (): Promise<IToken> => {
  const getDataToken = async () => {
    const token = await Promise.resolve(Token.getToken());
    return token;
  };

  return getDataToken();
};

export default useToken;
