import CopArrest from "../assets/cop-arrest.png"
import CopIdle from "../assets/cop-idle.png"
import CopLetgo from "../assets/cop-letgo.png"
import CopTicket from "../assets/cop-ticket.png"
import CopWave from "../assets/cop-wave.png"
import CopWonder from "../assets/cop-wonder.png"
import CopGift from "../assets/cop-gift.jpg"

import FemCopArrest from "../assets/femcop-arrest.png"
import FemCopIdle from "../assets/femcop-idle.png"
import FemCopLetgo from "../assets/femcop-letgo.png"
import FemCopTicket from "../assets/femcop-ticket.png"
import FemCopWave from "../assets/femcop-wave.png"
import FemCopWonder from "../assets/femcop-wonder.png"
import FemCopGift from "../assets/femcop-gift.jpg"

import RoboCopArrest from "../assets/robocop-arrest.png"
import RoboCopIdle from "../assets/robocop-idle.png"
import RoboCopLetgo from "../assets/robocop-letgo.png"
import RoboCopTicket from "../assets/robocop-ticket.png"
import RoboCopWave from "../assets/robocop-wave.png"
import RoboCopWonder from "../assets/robocop-wonder.png"
import RoboCopGift from "../assets/robocop-gift.jpg"

import BeachDayBg from "../assets/beach-day.jpg"
import BeachNightBg from "../assets/beach-night.jpg"
import CityDayBg from "../assets/city-day.jpg"
import CityNightBg from "../assets/city-night.jpg"
import VillageDayBg from "../assets/village-day.jpg"
import VillageNightBg from "../assets/village-night.jpg"


export namespace GameItems {
    export enum AvatarState {
        Wave,
        Idle,
        Wonder,
        Ticket,
        Letgo,
        Arrest,
        Gift,
    }
    export const healthRegenDivisor = 20;
    export const healthUpgradePrice = [20, 50, 100];
    export const healthRegenUpgradePrice = [5, 10, 17, 32, 70]
    export enum Avatar {
        Cop,
        FemCop,
        RoboCop,
    }

    export enum Background {
        CityDay,
        CityNight,
        VillageDay,
        VillageNight,
        BeachDay,
        BeachNight,
    }
}

export namespace GameItemMeta {
    export const Avatar : {[k in GameItems.Avatar] : number} = {
        [GameItems.Avatar.Cop] : 0,
        [GameItems.Avatar.FemCop] : 10,
        [GameItems.Avatar.RoboCop] : 30,
    };
    export const Background : {[k in GameItems.Background] : number}  = {
        [GameItems.Background.CityDay]: 0,
        [GameItems.Background.CityNight]: 6,
        [GameItems.Background.VillageDay]: 6,
        [GameItems.Background.VillageNight]: 6,
        [GameItems.Background.BeachDay]: 6,
        [GameItems.Background.BeachNight]: 6,
    }
}

export namespace GameAssets {
    export const Avatar: { [k in GameItems.Avatar]: { [s in GameItems.AvatarState]: string } } = {
        [GameItems.Avatar.Cop]: {
            [GameItems.AvatarState.Wave]: CopWave,
            [GameItems.AvatarState.Arrest]: CopArrest,
            [GameItems.AvatarState.Idle]: CopIdle,
            [GameItems.AvatarState.Letgo]: CopLetgo,
            [GameItems.AvatarState.Ticket]: CopTicket,
            [GameItems.AvatarState.Wonder]: CopWonder,
            [GameItems.AvatarState.Gift]: CopGift,
        },
        [GameItems.Avatar.FemCop]: {
            [GameItems.AvatarState.Wave]: FemCopWave,
            [GameItems.AvatarState.Arrest]: FemCopArrest,
            [GameItems.AvatarState.Idle]: FemCopIdle,
            [GameItems.AvatarState.Letgo]: FemCopLetgo,
            [GameItems.AvatarState.Ticket]: FemCopTicket,
            [GameItems.AvatarState.Wonder]: FemCopWonder,
            [GameItems.AvatarState.Gift]: FemCopGift,
        },
        [GameItems.Avatar.RoboCop]: {
            [GameItems.AvatarState.Wave]: RoboCopWave,
            [GameItems.AvatarState.Arrest]: RoboCopArrest,
            [GameItems.AvatarState.Idle]: RoboCopIdle,
            [GameItems.AvatarState.Letgo]: RoboCopLetgo,
            [GameItems.AvatarState.Ticket]: RoboCopTicket,
            [GameItems.AvatarState.Wonder]: RoboCopWonder,
            [GameItems.AvatarState.Gift] : RoboCopGift,
        },
    } as Readonly<typeof Avatar>

    export const background: { [k in GameItems.Background]: string } = {
        [GameItems.Background.CityDay]: CityDayBg,
        [GameItems.Background.CityNight]: CityNightBg,
        [GameItems.Background.VillageDay]: VillageDayBg,
        [GameItems.Background.VillageNight]: VillageNightBg,
        [GameItems.Background.BeachDay]: BeachDayBg,
        [GameItems.Background.BeachNight]: BeachNightBg,
    } as Readonly<typeof background>
}
