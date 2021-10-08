import CardHandler from "../helpers/CardHandler";
import DeckHandler from "../helpers/DeckHandler";
import GameHandler from "../helpers/GameHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import SocketHandler from "../helpers/SocketHandler";
import UIHandler from "../helpers/UIHandler";

import cyanCardBack from "../assets/cyanCardBack.png";
import magentaCardBack from "../assets/MagentaCardBack.png";
import cyanBoolean from "../assets/Cyan_Boolean3x.png";
import magentaBoolean from "../assets/Magenta_Boolean3x.png";
import cyanPing from "../assets/Cyan_Ping3x.png";
import magentaPing from "../assets/Magenta_Ping3x.png";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' })
    }

    preload() {
        // this.load.image('cyanCardBack', 'src/assets/CyanCardBack.png');
        // this.load.image('magentaCardBack', 'src/assets/MagentaCardBack.png');
        // this.load.image('cyanBoolean', 'src/assets/Cyan_Boolean3x.png');
        // this.load.image('magentaBoolean', 'src/assets/Magenta_Boolean3x.png');
        // this.load.image('cyanPing', 'src/assets/Cyan_Ping3x.png');
        // this.load.image('magentaPing', 'src/assets/Magenta_Ping3x.png');

        this.load.image('cyanCardBack', cyanCardBack);
        this.load.image('magentaCardBack', magentaCardBack);
        this.load.image('cyanBoolean', cyanBoolean);
        this.load.image('magentaBoolean', magentaBoolean);
        this.load.image('cyanPing', cyanPing);
        this.load.image('magentaPing', magentaPing);
    }

    create() {
        this.CardHandler = new CardHandler();
        this.DeckHandler = new DeckHandler(this);
        this.GameHandler = new GameHandler(this);
        this.SocketHandler = new SocketHandler(this);

        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();

        this.InteractiveHandler = new InteractiveHandler(this);
    }

    update() {

    }
}