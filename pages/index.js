const githubRepoUrl = 'https://github.com/meth/app'

const appModeIsProduction = (process.env.APP_MODE === 'production')

export default () => (
  <div>
    <p>Meth is a cross-platform wallet and Dapp browser that is under active development!</p>
    <p>You can follow its progress at <a href={githubRepoUrl}>{githubRepoUrl}</a></p>
    {appModeIsProduction ? (
      <p>This is the production sync server</p>
    ) : (
      <p>This is the development sync server, utilising in-memory sync storage</p>
    )}
  </div>
)
