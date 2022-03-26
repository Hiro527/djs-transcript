import { AnyChannel, Channel, Client, Message, NewsChannel, TextChannel } from "discord.js";
import { v4 } from "uuid";
import * as path from "path";
import * as fs from "fs/promises";
import { getHtml } from "./lib/GenerateHTML";

export const transcript = async (
    client: Client,
    channel: AnyChannel,
    fpath: string,
    locale?: string
) => {
    if (!(channel instanceof TextChannel || channel instanceof NewsChannel))
        return;
    await channel.messages.fetch();
    if (!channel.lastMessage) {
        throw Error(`The channel you specified has no messages to transcript.`);
    }
    const fname = path.join(fpath, `${v4()}.html`);
    const recursive = async (id: string, messages: Message[]): Promise<Message[]> => {
        const result = await channel.messages.fetch({ before: id, limit: 100 });
        messages.push(...result.values());
        messages.sort((a, b) => {
            return BigInt(a.id) > BigInt(b.id) ? 1 : -1;
        });
        if ([...result.values()].length < 100) {
            return messages;
        }
        return recursive(messages[0].id, messages);
    };
    const messages = await recursive(channel.lastMessageId!, [
        channel.lastMessage!,
    ]);
    const html = await getHtml(messages!, channel, channel.guild, locale);
    await fs.writeFile(fname, html);
    return fname;
};
