import app from './app';
import { CronService } from "./cron/CronService";
import { RabbitWorker } from "./lib/queue/rabbitmq/RabbitWorker";

const port = process.env.PORT || 3000;
CronService.run();
(new RabbitWorker).handle()

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});