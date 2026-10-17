import { batch, For, onMount, Setter, useContext } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { Page, PageContext, PlayerDataContext, PlayerDataContextType } from "../App";
import Coin from "../assets/coin.png";
import HealthRegen from "../assets/health-regen.png";
import Health from "../assets/health-up.png";
import Background from "../assets/mart-bg.jpg";
import { GameAssets, GameItemMeta, GameItems } from "../items/game-items";
interface ShopProps {
}
export const Shop = (props: ShopProps) => {
    const page = useContext(PageContext)!;
    const [player, setPlayer] = useContext(PlayerDataContext)!;
    onMount(() => {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
            page.set(Page.main);
            window.onpopstate = null;
        }
    })

    function buyThing(price: number, onSuccess: () => void) {
        if (player.coin < price) {
            return
        }
        else {
            setPlayer("coin", (p) => p - price);
            onSuccess();
        }
    }
    function onAvatarClick(av: GameItems.Avatar) {
        batch(() => {
            if (player.equipped.avatar == av) {
                return
            };
            if (!player.isUnlocked.avatar[av]) {
                const selectedPrice = GameItemMeta.Avatar[av];
                buyThing(selectedPrice, () => {
                    setPlayer("isUnlocked", "avatar", (p) => ({ ...p, [av]: true }))
                });
            } else {
                setPlayer("equipped", "avatar", av);
            }
        })
    }

    function onBackgroundClick(av: GameItems.Background) {
        batch(() => {
            if (player.equipped.background == av) {
                return
            };
            if (!player.isUnlocked.background[av]) {
                const selectedPrice = GameItemMeta.Background[av];
                buyThing(selectedPrice, () => {
                    setPlayer("isUnlocked", "background", (p) => ({ ...p, [av]: true }))
                });
            } else {
                setPlayer("equipped", "background", av);
            }
        })
    }

    function upgradeHealth() {
        batch(() => {
            if ((player.maxHealth - 3) >= GameItems.healthUpgradePrice.length) {
                return;
            }
            buyThing(GameItems.healthUpgradePrice[player.maxHealth - 3], () => {
                setPlayer("maxHealth", (p) => p + 1);
            });
        })
    }
    function upgradeRegen() {
        batch(() => {
            if ((player.healthRegen) >= GameItems.healthRegenUpgradePrice.length) {
                return;
            }
            buyThing(GameItems.healthRegenUpgradePrice[player.healthRegen], () => {
                setPlayer("healthRegen", (p) => p + 1);
            });
        })
    }
    return <div class="relative w-full h-full overflow-hidden">
        <div class="absolute left-0 top-0 w-full h-full overflow-hidden z-0">
            <img src={Background} class="w-full h-full object-cover" alt="" />
        </div>
        <div class="absolute left-0 top-0 w-full h-full overflow-hidden bg-black opacity-40 z-1" />
        <div class="overflow-scroll w-full h-full">
            <div class=" flex flex-col p-3 z-2 gap-4 relative">
                <div class="flex justify-between">
                    <button
                        onclick={() => page.set(Page.main)}
                        class="bg-blue-600 text-yellow-300 border-2 border-yellow-300 w-max p-2 text-xl font-bold rounded-full hover-scale-sm">Kembali</button>
                    <div class="flex gap-1 items-center justify-center p-2 bg-black/30 rounded-md">
                        <div class="text-white text-xl">
                            {player.coin}
                        </div>
                        <div>
                            <img src={Coin} class="w-6" alt="" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="text-xl text-white font-bold">
                        Karakter
                    </div>
                    <div class="grid grid-cols-3 gap-1 w-full">
                        <For each={Object.keys(GameItemMeta.Avatar)}>
                            {(_avatar, _) => {
                                const avatar = _avatar as any as GameItems.Avatar;
                                return <div onclick={() => onAvatarClick(avatar)}
                                    class={`h-44 relative overflow-hidden rounded-md bg-black/50 flex-wrap justify-end flex
                ${player.equipped.avatar == avatar ? "border-4 border-blue-500" : " cursor-pointer"}`}>
                                    <img src={GameAssets.Avatar[avatar][GameItems.AvatarState.Wave]} class="object-cover z-0" alt="" />
                                    {!player.isUnlocked.avatar[avatar]
                                        && <div class="absolute left-0 top-0 w-full z-1 bg-black/50 h-full grid place-content-center">
                                            <div class="flex items-center gap-1">
                                                <div class="text-white text-xl">
                                                    {GameItemMeta.Avatar[avatar]}
                                                </div>
                                                <div>
                                                    <img src={Coin} class="w-6" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }}
                        </For>
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="text-xl text-white font-bold">
                        Background
                    </div>
                    <div class="grid grid-cols-3 gap-1">
                        <For each={Object.keys(GameItemMeta.Background)}>
                            {(_background, _) => {
                                const background = _background as any as GameItems.Background;
                                return <div onclick={() => onBackgroundClick(background)}
                                    class={`h-44 relative overflow-hidden rounded-md bg-black/50 flex-wrap justify-end flex
            ${player.equipped.background == background ? "border-4 border-blue-500" : " cursor-pointer"}`}>
                                    <img src={GameAssets.background[background]} class="object-cover z-0" alt="" />
                                    {!player.isUnlocked.background[background]
                                        && <div class="absolute left-0 top-0 w-full z-1 bg-black/50 h-full grid place-content-center">
                                            <div class="flex items-center gap-1">
                                                <div class="text-white text-xl">
                                                    {GameItemMeta.Background[background]}
                                                </div>
                                                <div>
                                                    <img src={Coin} class="w-6" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }}
                        </For>
                    </div>
                </div>
                <div class="flex flex-col gap-1 text-sm">
                    <div class="text-xl text-white font-bold">
                        Nyawa
                    </div>
                    <div class="w-full p-2 flex gap-1 items-center justify-between bg-black/40 text-white">
                        <div class="flex items-center gap-2">
                            <img src={Health} class="w-10" alt="" />
                            <div class="flex flex-col gap-1">
                                <div>Tambah jumlah maks nyawa</div>
                                <div class="text-gray-400">(Nyawa saat ini : <span class="font-bold text-yellow-300">{player.maxHealth}</span>)</div>
                            </div>
                        </div>
                        {(player.maxHealth - 3) < GameItems.healthUpgradePrice.length
                            ? <button onclick={upgradeHealth} class="flex items-center gap-1 rounded-md bg-blue-500 border-2 cursor-pointer px-2 border-yellow-300">
                                <div class="text-white text-xl">
                                    {GameItems.healthUpgradePrice[player.maxHealth - 3]}
                                </div>
                                <div class="w-6">
                                    <img src={Coin} class="w-6" alt="" />
                                </div>
                            </button>
                            : <div class="px-2 border-yellow-300 bg-blue-500 text-white text-xl rounded-md border-2">
                                Maks
                            </div>
                        }
                    </div>
                    <div class="w-full p-2 flex gap-1 items-center justify-between bg-black/40 text-white">
                        <div class="flex items-center gap-2">
                            <img src={HealthRegen} class="w-10" alt="" />
                            <div class="flex flex-col gap-1">
                                <div>Tambah kesempatan untuk memulihkan 1 nyawa setiap anda mengambil keputusan yang benar</div>
                                <div class="text-gray-400">(Probabilitas saat ini : <span class="font-bold text-yellow-300">{player.healthRegen / GameItems.healthRegenDivisor * 100}%</span>)</div>
                            </div>
                        </div>
                        {player.healthRegen < GameItems.healthRegenUpgradePrice.length
                            ? <button onclick={upgradeRegen} class="flex items-center gap-1 rounded-md bg-blue-500 border-2 cursor-pointer px-2 border-yellow-300">
                                <div class="text-white text-xl">
                                    {GameItems.healthRegenUpgradePrice[player.healthRegen]}
                                </div>
                                <div class="w-6">
                                    <img src={Coin} class="w-6" alt="" />
                                </div>
                            </button>
                            : <div class="px-2 border-yellow-300 bg-blue-500 text-white text-xl rounded-md border-2">
                                Maks
                            </div>
                        }
                    </div>
                </div>
                <div class="h-72"></div>
            </div>
            <div></div>
        </div>
    </div>
}
