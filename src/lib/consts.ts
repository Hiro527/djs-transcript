export const Base = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>%SERVER% - %CHANNEL_NAME%</title>
        <style>
            body {
                background-color: #2C2F33;
                color: #FFFFFF;
                padding-top: 80px;
                font-family: "Whitney", "Helvetica Neue", Helvetica, Arial, sans-serif;
            }
            header {
                left: 0px;
                top: 0px;
                height: 80px;
                display: flex;
                position: fixed;
                align-items: center;
                width: 100%;
                background-color: #23272A;
            }
            #serverIcon {
                height: 60px;
                border-radius: 50%;
                margin: 10px;
            }
            #headerTimestamp {
                margin-left: 15px;
                color: rgba(255, 255, 255, 0.4);
            }
            .message {
                display: flex;
                align-items: flex-start;
                margin: 5px;
                margin-bottom: 20px;
                width: 100%;
                height: auto;
            }
            .avatar {
                height: 40px;
                border-radius: 50%;
                animation-play-state: paused;
            }
            .content {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
            }
            .msgTimestamp {
                color: rgba(255, 255, 255, 0.4);
                font-size: 13px;
            }
            .attachmentImage {
                width: max(30%, 300px);
                border-radius: 5px;
                margin-top: 10px;
            }
            .attachmentFile {
                margin-top: 10px;
                display: flex;
                align-items: center;
                width: 500px;
                height: 50px;
                border-radius: 5px;
                background-color: #23272A;
                border: rgba(0, 0, 0, 0.4) solid 1px;
            }
            .attachmentFile .fileName {
                margin-left: 10px;
                max-width: 150px;
                overflow: hidden;
                white-space: nowrap;
            }
            .attachmentFile .fileSize {
                margin-left: 10px;
                color: rgba(255, 255, 255, 0.4);
                font-size: 13px;
            }
            .attachmentFile .downloadBtn {
                margin-left: auto;
                margin-right: 10px;
            }
            .attachmentFile a {
                color: rgba(255, 255, 255, 0.4);
            }
            .attachmentFile a:hover {
                color: rgb(255, 255, 255);
            }
            .embed {
                margin-top: 10px;
                background-color: #23272A;
                width: 650px;
                font-size: 12px;
                border-radius: 4px;
            }
            .embedContent {
                display: flex;
                margin: 15px;
                justify-content: space-between;
            }
            .embedContentMain {
                min-width: 470px;
            }
            .embedAuthor {
                display: flex;
                align-items: center;
                margin-bottom: 10px
            }
            .embedAuthorAvatar {
                width: 25px;
                border-radius: 50%;
                margin-right: 10px;
            }
            .embedAuthorName {
                font-size: 14px;
                font-weight: bold;
            }
            .embedTitle {
                font-size: 16px;
                font-weight: bold;
            }
            .embedDesc {
                margin-top: 10px;
            }
            .embedRegField {
                margin-top: 10px;
            }
            .embedFieldTitle {
                color: rgba(255, 255, 255, 0.6);
            }
            .embedInlineFieldHolder {
                margin-top: 10px;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
            }
            .embedInlineField {
                max-width: 180px;
                min-width: 155px;
            }
            .embedImage {
                max-width: 450px;
                margin-top: 10px;
            }
            .embedFooter {
                margin-top: 10px;
                display: flex;
                align-items: center;
            }
            .embedFooterImage {
                width: 15px;
                border-radius: 50%;
            }
            .embedFooterText {
                margin-left: 7px;
                color: rgba(255, 255, 255, 0.6);
                font-size: 10px;
            }
            .embedThumbnail {
                max-height: 80px;
                max-width: 140px;
                margin-left: 10px
            }
            .spoiler {
                background-color: #5f5f5f;
            }
            .strike {
                text-decoration: line-through;
            }
            .bold {
                font-weight: bold;
            }
            .italic {
                font-style: italic;
            }
            .underline {
                text-decoration: underline;
            }
            .highlight {
                font-weight: normal;
                padding-left: 3px;
                padding-right: 3px;
                border-radius: 4px;
            }
            .codeB {
                margin-top: 5px;
                margin-bottom: 5px;
                padding: 7px;
                background-color: #23272A;
                border: rgba(0, 0, 0, 0.4) solid 1px;
                border-radius: 5px;
                width: 600px;
                font-family: monospace;
            }
            .codeL {
                background-color: #23272A;
                padding: 5px;
                border-radius: 3px;
                font-family: monospace;
            }
            .codeBe {
                margin-top: 5px;
                margin-bottom: 5px;
                padding: 7px;
                background-color: #111314;
                border: rgba(0, 0, 0, 0.4) solid 1px;
                border-radius: 5px;
                max-width: 620px;
                min-width: 480px;
                font-family: monospace;
            }
            .codeLe {
                background-color: #111314;
                padding: 5px;
                border-radius: 3px;
                font-family: monospace;
            }
            .noDeco {
                text-decoration: none;
            }
            .quote {
                margin-top: 5px;
                margin-bottom: 5px;
                padding-top: 2px;
                padding-bottom: 2px;
                border-radius: 2.5px;
                border-left: rgba(141, 141, 141, 0.5) solid 5px;
            }
            .quotedText {
                margin-left: 10px;
            }
            a:link, a:visited, a:hover, a:active {
                color: #00b0f4;
            }
            a:hover {
                text-decoration: underline;
            }
            .emoji {
                max-height: 20px
            }
        </style>
    </head>
    <body>
        <header>
            <img id="serverIcon" src="%SERVER_ICON%">
            <h1>%SERVER% - %CHANNEL_NAME%</h1>
            <div id="headerTimestamp">%TRANSCRIPT_TIMESTAMP%</div>
        </header>
        <script type="text/javascript">
        window.onload = () => {
            let element = document.documentElement;
            let bottom = element.scrollHeight - element.clientHeight;
            window.scroll(0, bottom);
        }
        </script>
        %CONTENTS%
    </body>
</html>`;
export const Message = `<div class="message">
    <img class="avatar" src="%MEMBER_AVATAR%">
    <div class="content">
        <div class="info">
            %MEMBER_TAG% <span class="msgTimestamp">%MESSAGE_CREATED_TIMESTAMP%%MESSAGE_EDITED_TIMESTAMP%</span>
        </div>
        <div class="messageContent">
            %MESSAGE_CONTENT%
        </div>
        %EMBEDS%
        %IMAGES%
        %FILES%
    </div>
</div>`;
export const Image = `<img class="attachmentImage" src="%IMAGE_URL%">`;
export const Video = `<video controls width="600" style="display:block"><source src="%VIDEO_URL%" type="video/%VIDEO_TYPE%"></video>`;
export const File = `<div class="attachmentFile">
    <div class="fileName">%FILE_NAME%</div>
    <div class="fileSize">%FILE_SIZE%</div>
    <div class="downloadBtn"><a class="noDeco" href="%FILE_URL%" target="_blank" rel="noopener noreferrer">Download</a></div>
</div>`;
export const EmbedBase = `<div class="embed" style="border-left: %EMBED_COLOR% solid 4px;">
    <div class="embedContent">
        <div class="embedContentMain">
            %EMBED_MAIN%
        </div>
        %EMBED_THUMBNAIL%
    </div>
</div>
`;
export const EmbedAuthor = `<div class="embedAuthor">
    %EMBED_AUTHOR_AVATAR%
    %EMBED_AUTHOR_NAME%
</div>
`;
export const EmbedTitle = `<div class="embedTitle">
    %EMBED_TITLE%
</div>`;
export const EmbedDesc = `<div class="embedDesc">
    %EMBED_DESC%
</div>
`;
export const EmbedRegularField = `<div class="embedRegField">
    <div class="embedFieldTitle">
        %EMBED_FIELD_TITLE%
    </div>
    <div class="embedFieldValue">
        %EMBED_FIELD_VALUE%
    </div>
</div>`;
export const EmbedInlineFieldBase = `<div class="embedInlineFieldHolder">
    %EMBED_INLINE_FIELDS%
</div>
`;
export const EmbedInlineField = `<div class="embedInlineField">
    <div class="embedFieldTitle">
        %EMBED_FIELD_TITLE%
    </div>
    <div class="embedFieldValue">
        %EMBED_FIELD_VALUE%
    </div>
</div>
`;
export const EmbedImage = `<img class="embedImage" src="%EMBED_IMAGE_URL%">`;
export const EmbedFooterTimestamp = `<span style="color: rgba(255, 255, 255, 0.4);"> • </span>%EMBED_FOOTER_TIMESTAMP%`;
export const EmbedFooter = `<div class="embedFooter">
    %EMBED_FOOTER_IMAGE%
    <div class="embedFooterText">%EMBED_FOOTER_TEXT%%EMBED_FOOTER_TIMESTAMP%</div>
</div>`;
export const EmbedFooterImage = `<img class="embedFooterImage" src="%EMBED_FOOTER_IMAGE_URL%">`;
export const EmbedThumbnail = `<img class="embedThumbnail" src="%EMBED_THUMBNAIL_IMAGE_URL%">`;
