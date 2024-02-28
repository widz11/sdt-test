import app from './app';
import { CronService } from "./cron/CronService";

const port = process.env.PORT || 3000;
CronService.run();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});