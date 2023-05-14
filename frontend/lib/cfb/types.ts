export type CFBGame = {
    id?:                 string;
    count?:              number;
    plays?:              CFBGamePlay[];
    box_score?:          BoxScoreClass;
    homeTeamId?:         string;
    awayTeamId?:         string;
    drives?:             Drives;
    scoringPlays?:       CFBGamePlay[];
    winprobability?:     Winprobability[];
    boxScore?:           BoxScore;
    homeTeamSpread?:     number;
    overUnder?:          number;
    header:              Header;
    broadcasts?:         CFBGameBroadcast[];
    videos?:             Video[];
    standings?:          CFBGameStandings;
    pickcenter?:         Pickcenter[];
    espnWinProbability?: any[];
    gameInfo?:           GameInfo;
    season?:             Season;
}

export type BoxScore = {
    teams?:   TeamElement[];
    players?: Player[];
}

export type Player = {
    team?:       PlayerTeam;
    statistics?: PlayerStatistic[];
}

export type PlayerStatistic = {
    name?:         string;
    keys?:         string[];
    text?:         string;
    labels?:       string[];
    descriptions?: string[];
    athletes?:     AthleteElement[];
    totals?:       string[];
}

export type AthleteElement = {
    athlete?: AthleteAthlete;
    stats?:   string[];
}

export type AthleteAthlete = {
    id?:          string;
    uid?:         string;
    guid?:        string;
    firstName?:   string;
    lastName?:    string;
    displayName?: string;
    links?:       AthleteLink[];
}

export type AthleteLink = {
    rel?:  Rel[];
    href?: string;
    text?: PurpleText;
}

export enum Rel {
    App = "app",
    Athlete = "athlete",
    Bio = "bio",
    Clubhouse = "clubhouse",
    Desktop = "desktop",
    Gamelog = "gamelog",
    Index = "index",
    Injuries = "injuries",
    League = "league",
    News = "news",
    Overview = "overview",
    Playercard = "playercard",
    Rankings = "rankings",
    Schedule = "schedule",
    Scores = "scores",
    Splits = "splits",
    Sportscenter = "sportscenter",
    Standings = "standings",
    Stats = "stats",
    Team = "team",
    Teams = "teams",
}

export enum PurpleText {
    Bio = "Bio",
    Clubhouse = "Clubhouse",
    GameLog = "Game Log",
    Index = "Index",
    Injuries = "Injuries",
    News = "News",
    Overview = "Overview",
    PlayerCard = "Player Card",
    Rankings = "Rankings",
    Schedule = "Schedule",
    Scores = "Scores",
    Splits = "Splits",
    Standings = "Standings",
    Stats = "Stats",
    Teams = "Teams",
}

export type PlayerTeam = {
    id?:               string;
    uid?:              string;
    slug?:             string;
    location?:         AwayTeamName;
    name?:             AwayTeamMascot;
    abbreviation?:     AwayTeamAbbrev;
    displayName?:      DisplayName;
    shortDisplayName?: AwayTeamMascot;
    color?:            string;
    alternateColor?:   string;
    logo?:             string;
}

export enum AwayTeamAbbrev {
    Fsu = "FSU",
    Lsu = "LSU",
}

export enum DisplayName {
    FloridaStateSeminoles = "Florida State Seminoles",
    LSUTigers = "LSU Tigers",
}

export enum AwayTeamName {
    FloridaState = "Florida State",
    Lsu = "LSU",
}

export enum AwayTeamMascot {
    Seminoles = "Seminoles",
    Tigers = "Tigers",
}

export type TeamElement = {
    team?:       PlayerTeam;
    statistics?: TeamStatistic[];
}

export type TeamStatistic = {
    name?:         string;
    displayValue?: string;
    label?:        string;
}

export type BoxScoreClass = {
    pass?:        Pass[];
    rush?:        Rush[];
    receiver?:    Receiver[];
    team?:        { [key: string]: number }[];
    situational?: { [key: string]: number }[];
    defensive?:   { [key: string]: number }[];
    turnover?:    Turnover[];
    drives?:      Drive[];
}

export type Drive = {
    pos_team?:                      number;
    drive_total_available_yards?:   number;
    drive_total_gained_yards?:      number;
    avg_field_position?:            number;
    plays_per_drive?:               number;
    yards_per_drive?:               number;
    drives?:                        number;
    drive_total_gained_yards_rate?: number;
}

export type Pass = {
    pos_team?:           number;
    passer_player_name?: string;
    Comp?:               number;
    Att?:                number;
    Yds?:                number;
    Pass_TD?:            number;
    Int?:                number;
    YPA?:                number;
    EPA?:                number;
    EPA_per_Play?:       number;
    WPA?:                number;
    SR?:                 number;
    Sck?:                number;
    athlete_name?:       string;
    qbr_epa?:            number;
    sack_epa?:           number;
    pass_epa?:           number;
    rush_epa?:           number;
    pen_epa?:            number;
    spread?:             number;
    exp_qbr?:            number;
}

export enum Name {
    JaydenDaniels = "Jayden Daniels",
    JordanTravis = "Jordan Travis",
    Team = "TEAM",
}

export type Receiver = {
    pos_team?:             number;
    receiver_player_name?: string;
    Rec?:                  number;
    Tar?:                  number;
    Yds?:                  number;
    Rec_TD?:               number;
    YPT?:                  number | null;
    EPA?:                  number;
    EPA_per_Play?:         number;
    WPA?:                  number;
    SR?:                   number;
    Fum?:                  number;
    Fum_Lost?:             number;
}

export type Rush = {
    pos_team?:           number;
    rusher_player_name?: string;
    Car?:                number;
    Yds?:                number;
    Rush_TD?:            number;
    YPC?:                number;
    EPA?:                number;
    EPA_per_Play?:       number;
    WPA?:                number;
    SR?:                 number;
    Fum?:                number;
    Fum_Lost?:           number;
}

export type Turnover = {
    pos_team?:                 number;
    pass_breakups?:            number;
    fumbles_lost?:             number;
    fumbles_recovered?:        number;
    total_fumbles?:            number;
    Int?:                      number;
    expected_turnovers?:       number;
    expected_turnover_margin?: number;
    turnovers?:                number;
    turnover_margin?:          number;
    turnover_luck?:            number;
}

export type CFBGameBroadcast = {
    type?:       PurpleType;
    station?:    string;
    stationKey?: StationKey;
    market?:     Market;
    media?:      PurpleMedia;
    lang?:       string;
    region?:     string;
}

export type Market = {
    id?:   string;
    type?: string;
}

export type PurpleMedia = {
    callLetters?: string;
    name?:        string;
    shortName?:   string;
}

export enum StationKey {
    Espn = "espn",
}

export type PurpleType = {
    id?:        string;
    shortName?: string;
    longName?:  string;
    slug?:      string;
}

export type Drives = {
    previous?: Previous[];
}

export type Previous = {
    id?:                 string;
    description?:        string;
    team?:               PreviousTeam;
    start?:              PreviousEnd;
    end?:                PreviousEnd;
    timeElapsed?:        TimeElapsed;
    yards?:              number;
    isScore?:            boolean;
    offensivePlays?:     number;
    result?:             Result;
    shortDisplayResult?: Result;
    displayResult?:      DriveDisplayResult;
    plays?:              PreviousPlay[];
}

export enum DriveDisplayResult {
    Downs = "Downs",
    EndOfGame = "End of Game",
    EndOfHalf = "End of Half",
    FieldGoal = "Field Goal",
    Fumble = "Fumble",
    MissedFG = "Missed FG",
    Punt = "Punt",
    Touchdown = "Touchdown",
}

export type PreviousEnd = {
    period?:   EndPeriod;
    clock?:    TimeElapsed;
    yardLine?: number;
    text?:     string;
}

export type TimeElapsed = {
    displayValue?: string;
}

export type EndPeriod = {
    type?:   DriveEndPeriodTypeEnum;
    number?: number;
}

export enum DriveEndPeriodTypeEnum {
    Quarter = "quarter",
}

export type PreviousPlay = {
    id?:                string;
    sequenceNumber?:    string;
    type?:              PlayTypeClass;
    text?:              string;
    awayScore?:         number;
    homeScore?:         number;
    period?:            PlayPeriod;
    clock?:             TimeElapsed;
    scoringPlay?:       boolean;
    priority?:          boolean;
    modified?:          Modified;
    wallclock?:         Date;
    start?:             PurpleEnd;
    end?:               PurpleEnd;
    statYardage?:       number;
    scoringType?:       ScoringType;
    mediaId?:           string;
    pointAfterAttempt?: PointAfterAttempt;
}

export type PurpleEnd = {
    down?:                  number;
    distance?:              number;
    yardLine?:              number;
    yardsToEndzone?:        number;
    downDistanceText?:      string;
    shortDownDistanceText?: string;
    possessionText?:        string;
    team?:                  PurpleTeam;
}

export type PurpleTeam = {
    id?: string;
}

export enum Modified {
    The20220909T2355Z = "2022-09-09T23:55Z",
}

export type PlayPeriod = {
    number?: number;
}

export type PointAfterAttempt = {
    id?:           number;
    text?:         string;
    abbreviation?: string;
    value?:        number;
}

export type ScoringType = {
    name?:         ScoringTypeName;
    displayName?:  DriveDisplayResult;
    abbreviation?: ScoringTypeAbbreviation;
}

export enum ScoringTypeAbbreviation {
    Bfg = "BFG",
    Eg = "EG",
    Eh = "EH",
    Ep = "EP",
    Fg = "FG",
    Fgm = "FGM",
    K = "K",
    Pen = "PEN",
    Punt = "PUNT",
    Rec = "REC",
    Rush = "RUSH",
    Td = "TD",
    To = "TO",
}

export enum ScoringTypeName {
    FieldGoal = "field-goal",
    Touchdown = "touchdown",
}

export type PlayTypeClass = {
    id:            string;
    text:          string;
    abbreviation:  ScoringTypeAbbreviation | null;
}

export enum Result {
    Downs = "DOWNS",
    EndOfGame = "END OF GAME",
    EndOfHalf = "END OF HALF",
    Fg = "FG",
    Fumble = "FUMBLE",
    MissedFg = "MISSED FG",
    Punt = "PUNT",
    Td = "TD",
}

export type PreviousTeam = {
    name?:             AwayTeamMascot;
    abbreviation?:     AwayTeamAbbrev;
    displayName?:      DisplayName;
    shortDisplayName?: AwayTeamMascot;
    logos?:            Image[];
}

export type Image = {
    href:         string;
    width?:       number;
    height?:      number;
    alt?:         string;
    rel?:         BoxscoreSource[];
    lastUpdated?: string;
}

export enum BoxscoreSource {
    Dark = "dark",
    Day = "day",
    Default = "default",
    Full = "full",
    Interior = "interior",
}

export type GameInfo = {
    venue?:      Venue;
    attendance?: number;
}

export type Venue = {
    id?:       string;
    fullName?: string;
    address?:  Address;
    capacity?: number;
    grass?:    boolean;
    images?:   Image[];
}

export type Address = {
    city?:    string;
    state?:   string;
    zipCode?: string;
}

export type Header = {
    id?:           string;
    uid?:          string;
    season?:       Season;
    timeValid?:    boolean;
    competitions:  Competition[];
    links?:        HeaderLink[];
    week?:         number;
    league?:       League;
    gameNote?:     string;
}

export type Competition = {
    id?:                    string;
    uid?:                   string;
    date:                   string;
    neutralSite?:           boolean;
    conferenceCompetition?: boolean;
    boxscoreAvailable?:     boolean;
    commentaryAvailable?:   boolean;
    liveAvailable?:         boolean;
    onWatchESPN?:           boolean;
    recent?:                boolean;
    boxscoreSource?:        BoxscoreSource;
    playByPlaySource?:      BoxscoreSource;
    competitors:            Competitor[];
    status:                 Status;
    broadcasts?:            CompetitionBroadcast[];
    home:                   Away;
    away:                   Away;
}

export type Away = {
    id:              string;
    uid?:            string;
    location:        AwayTeamName;
    name?:           AwayTeamMascot;
    nickname?:       string;
    abbreviation?:   AwayTeamAbbrev;
    displayName?:    DisplayName;
    color?:          string;
    alternateColor?: string;
    logos:           Image[];
    links?:          AthleteLink[];
}

export type CompetitionBroadcast = {
    type?:   FluffyType;
    market?: Market;
    media?:  FluffyMedia;
    lang?:   string;
    region?: string;
    url?:    string;
}

export type FluffyMedia = {
    shortName?: string;
}

export type FluffyType = {
    id?:        string;
    shortName?: string;
}

export type Competitor = {
    id:          string;
    uid?:        string;
    order?:      number;
    homeAway:    string;
    winner?:     boolean;
    team:        Away;
    score?:      string;
    linescores?: TimeElapsed[];
    record?:     Record[];
    possession?: boolean;
}

export type Record = {
    type?:         string;
    summary?:      string;
    displayValue?: string;
}

export type Status = {
    type:  StatusType;
}

export type StatusType = {
    id:           string;
    name:         string;
    state:        string;
    completed:    boolean;
    description:  string;
    detail:       string;
    shortDetail:  string;
}

export type League = {
    id?:           string;
    uid?:          string;
    name?:         string;
    abbreviation?: string;
    midsizeName?:  string;
    slug?:         string;
    isTournament?: boolean;
    links?:        AthleteLink[];
}

export type HeaderLink = {
    rel?:        string[];
    href?:       string;
    text?:       string;
    shortText?:  string;
    isExternal?: boolean;
    isPremium?:  boolean;
}

export type Season = {
    year?: number;
    type?: number;
}

export type Pickcenter = {
    provider?:     Provider;
    details?:      string;
    overUnder?:    number;
    spread?:       number;
    awayTeamOdds?: TeamOdds;
    homeTeamOdds?: TeamOdds;
    links?:        any[];
}

export type TeamOdds = {
    favorite?:      boolean;
    underdog?:      boolean;
    moneyLine?:     number;
    spreadOdds?:    number;
    teamId?:        string;
    winPercentage?: number;
    averageScore?:  number;
    spreadRecord?:  SpreadRecord;
}

export type SpreadRecord = {
    wins?:    number;
    losses?:  number;
    pushes?:  number;
    summary?: string;
}

export type Provider = {
    id?:       string;
    name?:     string;
    priority?: number;
}

export type CFBGamePlay = {
    id:                                         number;
    sequenceNumber:                             string;
    text:                                       string;
    awayScore:                                  number;
    homeScore:                                  number;
    scoringPlay:                                boolean;
    priority:                                   boolean;
    modified:                                   Modified;
    wallclock:                                  Date;
    statYardage:                                number;
    "period.number":                            number;
    mediaId:                                    null | string;
    "pointAfterAttempt.id":                     number | null;
    "pointAfterAttempt.text":                   null | string;
    "pointAfterAttempt.abbreviation":           null | string;
    "pointAfterAttempt.value":                  number | null;
    "drive.id":                                 string;
    "drive.displayResult":                      DriveDisplayResult;
    "drive.isScore":                            boolean;
    "drive.team.shortDisplayName":              AwayTeamMascot;
    "drive.team.displayName":                   DisplayName;
    "drive.team.name":                          AwayTeamMascot;
    "drive.team.abbreviation":                  AwayTeamAbbrev;
    "drive.yards":                              number;
    "drive.offensivePlays":                     number;
    "drive.result":                             Result;
    "drive.description":                        string;
    "drive.shortDisplayResult":                 Result;
    "drive.timeElapsed.displayValue":           string;
    "drive.start.period.number":                number;
    "drive.start.period.type":                  DriveEndPeriodTypeEnum;
    "drive.start.yardLine":                     number;
    "drive.start.clock.displayValue":           string;
    "drive.start.text":                         string;
    "drive.end.period.number":                  number;
    "drive.end.period.type":                    DriveEndPeriodTypeEnum;
    "drive.end.yardLine":                       number;
    "drive.end.clock.displayValue":             null | string;
    game_id:                                    number;
    season:                                     number;
    seasonType:                                 number;
    homeTeamId:                                 number;
    awayTeamId:                                 number;
    homeTeamName:                               AwayTeamAbbrev;
    awayTeamName:                               AwayTeamName;
    homeTeamMascot:                             AwayTeamMascot;
    awayTeamMascot:                             AwayTeamMascot;
    homeTeamAbbrev:                             AwayTeamAbbrev;
    awayTeamAbbrev:                             AwayTeamAbbrev;
    homeTeamNameAlt:                            AwayTeamAbbrev;
    awayTeamNameAlt:                            AwayTeamNameAlt;
    homeTeamSpread:                             number;
    gameSpread:                                 number;
    gameSpreadAvailable:                        boolean;
    overUnder:                                  number;
    homeFavorite:                               boolean;
    "clock.minutes":                            string;
    "clock.seconds":                            string;
    half:                                       number;
    lag_half:                                   null | string;
    lead_half:                                  number;
    "start.TimeSecsRem":                        number;
    "start.adj_TimeSecsRem":                    number;
    lead_text:                                  string;
    lead_start_team:                            string;
    lead_start_yardsToEndzone:                  number;
    lead_start_down:                            number;
    lead_start_distance:                        number;
    lead_scoringPlay:                           boolean;
    text_dupe:                                  boolean;
    game_play_number:                           number;
    "start.pos_team.id":                        number;
    "start.def_pos_team.id":                    number;
    "end.def_team.id":                          number;
    "end.pos_team.id":                          number;
    "end.def_pos_team.id":                      number;
    "start.pos_team.name":                      AwayTeamName;
    "start.def_pos_team.name":                  AwayTeamName;
    "end.pos_team.name":                        AwayTeamName;
    "end.def_pos_team.name":                    AwayTeamName;
    "start.is_home":                            boolean;
    "end.is_home":                              boolean;
    homeTimeoutCalled:                          boolean;
    awayTimeoutCalled:                          boolean;
    "end.homeTeamTimeouts":                     number;
    "end.awayTeamTimeouts":                     number;
    "start.homeTeamTimeouts":                   number;
    "start.awayTeamTimeouts":                   number;
    "end.TimeSecsRem":                          number;
    "end.adj_TimeSecsRem":                      number;
    "start.defPosTeamTimeouts":                 number;
    "end.defPosTeamTimeouts":                   number;
    firstHalfKickoffTeamId:                     number;
    period:                                     number;
    "start.yard":                               number;
    "end.yard":                                 number;
    playType:                                   string;
    week:                                       number;
    lag_scoringPlay:                            boolean | null;
    end_of_half:                                boolean;
    down_1:                                     boolean;
    down_2:                                     boolean;
    down_3:                                     boolean;
    down_4:                                     boolean;
    down_1_end:                                 boolean;
    down_2_end:                                 boolean;
    down_3_end:                                 boolean;
    down_4_end:                                 boolean;
    scoring_play:                               boolean;
    td_play:                                    boolean;
    touchdown:                                  boolean;
    td_check:                                   boolean;
    safety:                                     boolean;
    fumble_vec:                                 boolean;
    forced_fumble:                              boolean;
    kickoff_play:                               boolean;
    kickoff_tb:                                 boolean;
    kickoff_onside:                             boolean;
    kickoff_oob:                                boolean;
    kickoff_fair_catch:                         boolean;
    kickoff_downed:                             boolean;
    kick_play:                                  boolean;
    kickoff_safety:                             boolean;
    punt:                                       boolean;
    punt_play:                                  boolean;
    punt_tb:                                    boolean;
    punt_oob:                                   boolean;
    punt_fair_catch:                            boolean;
    punt_downed:                                boolean;
    punt_safety:                                boolean;
    penalty_safety:                             boolean;
    punt_blocked:                               boolean;
    rush:                                       boolean;
    pass:                                       boolean;
    sack_vec:                                   boolean;
    pos_team:                                   number;
    def_pos_team:                               number;
    is_home:                                    boolean;
    lag_HA_score_diff:                          number | null;
    HA_score_diff:                              number;
    net_HA_score_pts:                           number | null;
    H_score_diff:                               number | null;
    A_score_diff:                               number | null;
    lag_homeScore:                              number;
    lag_awayScore:                              number;
    "start.homeScore":                          number;
    "start.awayScore":                          number;
    "end.homeScore":                            number;
    "end.awayScore":                            number;
    pos_team_score:                             number;
    def_pos_team_score:                         number;
    "start.pos_team_score":                     number;
    "start.def_pos_team_score":                 number;
    "start.pos_score_diff":                     number;
    "end.pos_team_score":                       number;
    "end.def_pos_team_score":                   number;
    "end.pos_score_diff":                       number;
    lag_pos_team:                               number;
    lead_pos_team:                              number | null;
    lead_pos_team2:                             number | null;
    pos_score_diff:                             number;
    lag_pos_score_diff:                         number;
    pos_score_pts:                              number;
    pos_score_diff_start:                       number;
    "start.pos_team_receives_2H_kickoff":       boolean;
    "end.pos_team_receives_2H_kickoff":         boolean;
    change_of_poss:                             number;
    penalty_flag:                               boolean;
    penalty_declined:                           boolean;
    penalty_no_play:                            boolean;
    penalty_offset:                             boolean;
    penalty_1st_conv:                           boolean;
    penalty_in_text:                            boolean;
    penalty_detail:                             null | string;
    penalty_text:                               null | string;
    yds_penalty:                                number | null;
    sack:                                       boolean;
    int:                                        boolean;
    int_td:                                     boolean;
    completion:                                 boolean;
    pass_attempt:                               boolean;
    target:                                     boolean;
    pass_breakup:                               boolean;
    pass_td:                                    boolean;
    rush_td:                                    boolean;
    turnover_vec:                               boolean;
    offense_score_play:                         boolean;
    defense_score_play:                         boolean;
    downs_turnover:                             boolean;
    yds_punted:                                 number | null;
    yds_punt_gained:                            number | null;
    fg_attempt:                                 boolean;
    fg_made:                                    boolean;
    yds_fg:                                     number | null;
    pos_unit:                                   PosUnit;
    def_pos_unit:                               DefPosUnit;
    lead_play_type:                             null | string;
    sp:                                         boolean;
    play:                                       boolean;
    scrimmage_play:                             boolean;
    change_of_pos_team:                         boolean;
    pos_score_diff_end:                         number;
    fumble_lost:                                boolean;
    fumble_recovered:                           boolean;
    yds_rushed:                                 number | null;
    yds_receiving:                              number | null;
    yds_int_return:                             null;
    yds_kickoff:                                number | null;
    yds_kickoff_return:                         number | null;
    yds_punt_return:                            number | null;
    yds_fumble_return:                          null;
    yds_sacked:                                 number | null;
    sack_players:                               null | string;
    rush_player_name:                           null;
    receiver_player_name:                       null | string;
    passer_player_name:                         Name | null;
    sack_player_name:                           null | string;
    sack_player_name2:                          null | string;
    interception_player_name:                   null;
    pass_breakup_player_name:                   null;
    fg_kicker_player_name:                      null | string;
    fg_return_player_name:                      null;
    fg_block_player_name:                       null | string;
    punter_player_name:                         null | string;
    punt_return_player_name:                    null | string;
    punt_block_player_name:                     null;
    punt_block_return_player_name:              null;
    kickoff_player_name:                        null | string;
    kickoff_return_player_name:                 null | string;
    fumble_player_name:                         null | string;
    fumble_forced_player_name:                  Name | null;
    fumble_recovered_player_name:               null | string;
    rusher_player_name:                         null | string;
    new_down:                                   number;
    new_distance:                               number;
    middle_8:                                   boolean;
    rz_play:                                    boolean;
    scoring_opp:                                boolean;
    stuffed_run:                                boolean;
    stopped_run:                                boolean;
    opportunity_run:                            boolean;
    highlight_run:                              boolean;
    adj_rush_yardage:                           number | null;
    line_yards:                                 number | null;
    second_level_yards:                         number | null;
    open_field_yards:                           number | null;
    highlight_yards:                            number | null;
    opp_highlight_yards:                        number | null;
    short_rush_success:                         boolean;
    short_rush_attempt:                         boolean;
    power_rush_success:                         boolean;
    power_rush_attempt:                         boolean;
    early_down:                                 boolean;
    late_down:                                  boolean;
    early_down_pass:                            boolean;
    early_down_rush:                            boolean;
    late_down_pass:                             boolean;
    late_down_rush:                             boolean;
    standard_down:                              boolean;
    passing_down:                               boolean;
    TFL:                                        boolean;
    TFL_pass:                                   boolean;
    TFL_rush:                                   boolean;
    havoc:                                      boolean;
    "start.pos_team_spread":                    number;
    "start.elapsed_share":                      number;
    "start.spread_time":                        number;
    "end.pos_team_spread":                      number;
    "end.elapsed_share":                        number;
    "end.spread_time":                          number;
    down:                                       number | null;
    distance:                                   number | null;
    "start.yardsToEndzone.touchback":           number;
    EP_start_touchback:                         number;
    EP_start:                                   number;
    EP_end:                                     number;
    lag_EP_end:                                 number | null;
    lag_change_of_pos_team:                     boolean;
    EP_between:                                 number | null;
    EPA:                                        number;
    def_EPA:                                    number;
    EPA_scrimmage:                              number | null;
    EPA_rush:                                   number | null;
    EPA_pass:                                   number | null;
    EPA_explosive:                              boolean;
    EPA_non_explosive:                          number | null;
    EPA_explosive_pass:                         boolean;
    EPA_explosive_rush:                         boolean;
    first_down_created:                         boolean;
    EPA_success:                                boolean;
    EPA_success_early_down:                     boolean;
    EPA_success_early_down_pass:                boolean;
    EPA_success_early_down_rush:                boolean;
    EPA_success_late_down:                      boolean;
    EPA_success_late_down_pass:                 boolean;
    EPA_success_late_down_rush:                 boolean;
    EPA_success_standard_down:                  boolean;
    EPA_success_passing_down:                   boolean;
    EPA_success_pass:                           boolean;
    EPA_success_rush:                           boolean;
    EPA_success_EPA:                            number | null;
    EPA_success_standard_down_EPA:              number | null;
    EPA_success_passing_down_EPA:               number | null;
    EPA_success_pass_EPA:                       number | null;
    EPA_success_rush_EPA:                       boolean;
    EPA_middle_8_success:                       boolean;
    EPA_middle_8_success_pass:                  boolean;
    EPA_middle_8_success_rush:                  boolean;
    EPA_penalty:                                number | null;
    EPA_sp:                                     number;
    EPA_fg:                                     number | null;
    EPA_punt:                                   number | null;
    EPA_kickoff:                                number | null;
    "start.ExpScoreDiff_touchback":             number;
    "start.ExpScoreDiff":                       number;
    "start.ExpScoreDiff_Time_Ratio_touchback":  number;
    "start.ExpScoreDiff_Time_Ratio":            number;
    "end.ExpScoreDiff":                         number;
    "end.ExpScoreDiff_Time_Ratio":              number;
    wp_before:                                  number;
    wp_touchback:                               number;
    def_wp_before:                              number;
    home_wp_before:                             number;
    away_wp_before:                             number;
    lead_wp_before:                             number | null;
    lead_wp_before2:                            number | null;
    wp_after:                                   number;
    def_wp_after:                               number;
    home_wp_after:                              number;
    away_wp_after:                              number;
    wpa:                                        number;
    drive_start:                                number;
    drive_stopped:                              boolean;
    drive_play_index:                           number;
    drive_offense_plays:                        number;
    prog_drive_EPA:                             number | null;
    prog_drive_WPA:                             number;
    drive_offense_yards:                        number;
    drive_total_yards:                          number;
    qbr_epa:                                    number;
    weight:                                     number;
    non_fumble_sack:                            boolean;
    sack_epa:                                   number | null;
    pass_epa:                                   number | null;
    rush_epa:                                   number | null;
    pen_epa:                                    number | null;
    sack_weight:                                number | null;
    pass_weight:                                number | null;
    rush_weight:                                number | null;
    pen_weight:                                 number | null;
    action_play:                                boolean;
    athlete_name:                               null | string;
    clock:                                      PlayClock;
    type:                                       PlayTypeClass;
    modelInputs:                                ModelInputs;
    expectedPoints:                             ExpectedPoints;
    winProbability:                             ExpectedPoints;
    start:                                      FluffyEnd;
    end:                                        FluffyEnd;
    players:                                    { [key:  string]:  null | string };
}

export enum AwayTeamNameAlt {
    FloridaSt = "Florida St",
}

export type PlayClock = {
    displayValue?: string;
    minutes?:      string;
    seconds?:      string;
}

export enum DefPosUnit {
    Defense = "Defense",
    FieldGoalDefense = "Field Goal Defense",
    KickoffDefense = "Kickoff Defense",
    PuntReturn = "Punt Return",
}

export type FluffyEnd = {
    team:                     FluffyTeam;
    pos_team:                 PosTeam;
    def_pos_team:             PosTeam;
    distance:                 number;
    yardLine:                 number;
    down:                     number;
    yardsToEndzone:           number;
    homeScore:                number;
    awayScore:                number;
    pos_team_score:           number;
    def_pos_team_score:       number;
    pos_score_diff:           number;
    posTeamTimeouts:          number;
    defPosTeamTimeouts:       number;
    ExpScoreDiff:             number;
    ExpScoreDiff_Time_Ratio:  number;
    shortDownDistanceText:    null | string;
    possessionText:           null | string;
    downDistanceText:         null | string;
    defTeamTimeouts:          number;
    posTeamSpread:            number;
}

export type PosTeam = {
    id:   number;
    name?: AwayTeamName;
}

export type FluffyTeam = {
    id?: number;
}

export type ExpectedPoints = {
    before: number;
    after:  number;
    added:  number;
}

export type ModelInputs = {
    start?: ModelInputsEnd;
    end?:   ModelInputsEnd;
}

export type ModelInputsEnd = {
    down?:                         number;
    distance?:                     number;
    yardsToEndzone?:               number;
    TimeSecsRem?:                  number;
    adj_TimeSecsRem?:              number;
    pos_score_diff?:               number;
    posTeamTimeouts?:              number;
    defTeamTimeouts?:              number;
    ExpScoreDiff?:                 number;
    ExpScoreDiff_Time_Ratio?:      number;
    spread_time?:                  number;
    pos_team_receives_2H_kickoff?: boolean;
    is_home?:                      boolean;
    period?:                       number;
}

export enum PosUnit {
    FieldGoalOffense = "Field Goal Offense",
    KickoffReturn = "Kickoff Return",
    Offense = "Offense",
    PuntOffense = "Punt Offense",
}

export type ScoringPlay = {
    id?:          string;
    type?:        PlayTypeClass;
    text?:        string;
    awayScore?:   number;
    homeScore?:   number;
    period?:      PlayPeriod;
    clock?:       ScoringPlayClock;
    team?:        ScoringPlayTeam;
    scoringType?: ScoringType;
}

export type ScoringPlayClock = {
    value?:        number;
    displayValue?: string;
}

export type ScoringPlayTeam = {
    id?:           string;
    uid?:          string;
    displayName?:  DisplayName;
    abbreviation?: AwayTeamAbbrev;
    links?:        FullViewLinkElement[];
    logo?:         string;
    logos?:        Image[];
}

export type FullViewLinkElement = {
    href?: string;
    text?: FullViewLinkText;
}

export enum FullViewLinkText {
    Clubhouse = "Clubhouse",
    FullStandings = "Full Standings",
    Schedule = "Schedule",
}

export type CFBGameStandings = {
    fullViewLink?: FullViewLinkElement;
    groups?:       Group[];
}

export type Group = {
    divisions?: Division[];
    header?:    string;
    href?:      string;
}

export type Division = {
    header?:    string;
    standings?: DivisionStandings;
}

export type DivisionStandings = {
    entries?: Entry[];
}

export type Entry = {
    team?:  string;
    link?:  string;
    id?:    string;
    uid?:   string;
    stats?: Stat[];
    logo?:  Image[];
}

export type Stat = {
    id?:               string;
    name?:             StatName;
    abbreviation?:     StatAbbreviation;
    displayName?:      StatDisplayName;
    shortDisplayName?: ShortDisplayName;
    description?:      Description;
    type?:             StatType;
    summary?:          string;
    displayValue?:     string;
}

export enum StatAbbreviation {
    Conf = "CONF",
    Overall = "overall",
}

export enum Description {
    ConferenceRecord = "Conference Record",
    OverallRecord = "Overall Record",
}

export enum StatDisplayName {
    Overall = "Overall",
    VsConference = "vs. Conference",
}

export enum StatName {
    Overall = "overall",
    VsConf = "vs. Conf.",
}

export enum ShortDisplayName {
    Conf = "CONF",
    Over = "OVER",
}

export enum StatType {
    Total = "total",
    Vsconf = "vsconf",
}

export type Video = {
    source?:              StationKey;
    id?:                  number;
    headline?:            string;
    description?:         string;
    ad?:                  Ad;
    tracking?:            Tracking;
    cerebroId?:           string;
    lastModified?:        Date;
    originalPublishDate?: Date;
    timeRestrictions?:    TimeRestrictions;
    deviceRestrictions?:  DeviceRestrictions;
    duration?:            number;
    thumbnail?:           string;
    links?:               Links;
    playId?:              string;
}

export type Ad = {
    sport?:  Sport;
    bundle?: Bundle;
}

export enum Bundle {
    NcfInstantReplays = "ncf_instant_replays",
    NcfMayhemmoment = "ncf_mayhemmoment",
    SECNow = "sec_now",
}

export enum Sport {
    Ncf = "ncf",
}

export type DeviceRestrictions = {
    type?:    DeviceRestrictionsType;
    devices?: Device[];
}

export enum Device {
    Desktop = "desktop",
    Handset = "handset",
    Settop = "settop",
    Tablet = "tablet",
}

export enum DeviceRestrictionsType {
    Whitelist = "whitelist",
}

export type Links = {
    api?:    API;
    web?:    Web;
    source?: Source;
    mobile?: Mobile;
}

export type API = {
    self?:    Artwork;
    artwork?: Artwork;
}

export type Artwork = {
    href?: string;
}

export type Mobile = {
    alert?:               Artwork;
    source?:              Artwork;
    href?:                string;
    streaming?:           Artwork;
    progressiveDownload?: Artwork;
}

export type Source = {
    mezzanine?: Artwork;
    flash?:     Artwork;
    hds?:       Artwork;
    HLS?:       HLS;
    HD?:        Artwork;
    full?:      Artwork;
    href?:      string;
}

export type HLS = {
    href?: string;
    HD?:   Artwork;
}

export type Web = {
    href?:  string;
    short?: Artwork;
    self?:  Artwork;
}

export type TimeRestrictions = {
    embargoDate?:    Date;
    expirationDate?: Date;
}

export type Tracking = {
    sportName?:    Sport;
    leagueName?:   LeagueName;
    coverageType?: CoverageType;
    trackingName?: string;
    trackingId?:   string;
}

export enum CoverageType {
    FinalGameHighlight = "Final Game Highlight",
    Highlight = "Highlight",
    OnePlay = "OnePlay",
}

export enum LeagueName {
    NoLeague = "No League",
}

export type Winprobability = {
    tiePercentage?:     number;
    homeWinPercentage?: number;
    secondsLeft?:       number;
    playId?:            string;
}