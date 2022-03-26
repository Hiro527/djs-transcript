import { Client, Channel, AnyChannel } from "discord.js";

export function transcript(client: Client, channel: AnyChannel, fpath: string, locale?: string): Promise<string>