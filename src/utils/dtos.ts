export type Choice = {
  discard: number,
  draws: number[],
  drawCount: number,
}

export type Rank2Level = {
  id: number,
  score: number,
  delta: number,
}

export type Rank2Item = {
  delta: number,
  id: number,
  latest_timestamp: number,
  level: Rank2Level,
  nickname: string,
}

export type Rank2Tap = {
  bottom: Rank2Item[],
  top: Rank2Item[],
}

export type Rank2DTO = {
  0: Rank2Tap,
  12: Rank2Tap,
  16: Rank2Tap,
}

export type TileAnalyseResult = {
  currentTileString: string,
  currentTileSimpleString: string,
  shanten: number,
  currentTiles: number[],
  currentRenderTiles: number[],
  choices: Choice[],
  incShantenChoices: Choice[],
}

export type Groupx = {
  title: string,
  num: string,
  content: string,
}

export type Level = {
  id: number,
  score: number,
}

export type Rank = {
  accountId: number,
  avatarId: number,
  nickname: string,
  level: Level,
  level3: Level,
}

export type RandomResponse = {
  result: TileAnalyseResult,
}

export type AnalyseResponse = {
  result: TileAnalyseResult,
}

export type AnalyseArrayResponse = {
  result: TileAnalyseResult,
}

export type GroupResponse = {
  groups: Groupx[],
}

export type RankResponse = {
  rank3: Rank[],
  rank4: Rank[],
}

