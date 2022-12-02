import { BigInt } from "@graphprotocol/graph-ts";
import {
  GameEnded as GameEndedEvent,
  GameStarted as GameStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PlayerJoined as PlayerJoinedEvent
} from "../generated/RandomWinnerGame/RandomWinnerGame"
import {Game} from "../generated/schema"

export function handleGameEnded(event: GameEndedEvent): void {

  let entity = Game.load(event.params.gameId.toString());
  if(!entity){
    return;
  }
  entity.winner = event.params.winner
  entity.requestId = event.params.requestId
  entity.save()
}

export function handleGameStarted(event: GameStartedEvent): void {
  let entity = Game.load(event.params.gameId.toString());
  
  if (!entity) {
    entity = new Game(event.params.gameId.toString());
    entity.players = [];
  }

  entity.maxPlayers = event.params.maxPlayers;
  entity.entryFee = event.params.entryFee;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {}

export function handlePlayerJoined(event: PlayerJoinedEvent): void {
  let entity = Game.load(event.params.gameId.toString());
  if (!entity) {
    return;
  }

  let newPlayers = entity.players;
  newPlayers.push(event.params.player);
  entity.players = newPlayers;

  entity.save();
}
