import cron from "node-cron";
import TelegramBot from "node-telegram-bot-api";
import prisma from "../database/dbConfig.js";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });

export function startScheduler() {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    const localNow = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    const currentDate = localNow.toISOString().split("T")[0];
    const currentTime = localNow.toTimeString().slice(0, 5);

    const startOfDay = new Date(currentDate + "T00:00:00");
    const endOfDay = new Date(currentDate + "T23:59:59");

    const schedules = await prisma.schedule.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        time: {
          startsWith: currentTime,
        },
      },
      include: { User: true },
    });

    for (const schedule of schedules) {
      if (schedule.User?.chat_id) {
        const message = `Hai ${schedule.User.name}, hari ini kamu ada jadwal ${schedule.title} dan harus ${schedule.description}`;
        await bot.sendMessage(schedule.User.chat_id, message);
      }
    }
  });
}

export function startExpenditureChecker() {
  cron.schedule("0 8 * * *", async () => {
    const users = await prisma.user.findMany({
      include: { Expenditures: true },
    });

    for (const user of users) {
      if (!user.chat_id) continue;

      const now = new Date();
      const total = await prisma.expenditure.aggregate({
        where: {
          user_id: user.id,
          date: {
            gte: new Date(now.getFullYear(), now.getMonth(), 1),
            lt: new Date(now.getFullYear(), now.getMonth() + 1, 1),
          },
        },
        _sum: { harga: true },
      });

      const totalBulanIni = total._sum.harga || 0;

      if (totalBulanIni > 400000) {
        await bot.sendMessage(
          user.chat_id,
          `⚠️ Hai ${
            user.name
          }, pengeluaranmu bulan ini sudah mencapai Rp ${totalBulanIni.toLocaleString(
            "id-ID"
          )}. Yuk mulai hemat 💸`
        );
      }
    }
  });
}
