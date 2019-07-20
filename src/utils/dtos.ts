export type Choice = {
  discard: number,
  draws: number[],
  drawCount: number,
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
  groups: Group[],
}
