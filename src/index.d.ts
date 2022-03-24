import { Client, Channel } from "discord.js";

export function transcript(client: Client, channel: Channel, fpath: string, locale?: string): Promise<string>