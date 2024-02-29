import expressApp from './app';

const port = process.env.PORT || 3000;
const app = expressApp.app;
expressApp.run();
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});