export type CFBTeamSummary = {
    teamData?:  TeamData;
    breakdown?: Breakdown[];
    players?:   Players;
    season?:    string;
}

export type Breakdown = {
    team_id?:                           number;
    pos_team?:                          string;
    abbreviation?:                      string;
    season?:                            number;
    plays_off?:                         number;
    playsgame_off?:                     number;
    passrate_off?:                      number;
    rushrate_off?:                      number;
    havoc_off?:                         number;
    explosive_off?:                     number;
    TEPA_off?:                          number;
    EPAplay_off?:                       number;
    EPAgame_off?:                       number;
    yards_off?:                         number;
    yardsplay_off?:                     number;
    yardsgame_off?:                     number;
    play_stuffed_off?:                  number;
    drives_off?:                        number;
    drivesgame_off?:                    number;
    yardsdrive_off?:                    number;
    playsdrive_off?:                    number;
    success_off?:                       number;
    red_zone_success_off?:              number;
    third_down_success_off?:            number;
    start_position_off?:                number;
    playsgame_off_rank?:                number;
    TEPA_off_rank?:                     number;
    EPAgame_off_rank?:                  number;
    EPAplay_off_rank?:                  number;
    success_off_rank?:                  number;
    yards_off_rank?:                    number;
    yardsplay_off_rank?:                number;
    yardsgame_off_rank?:                number;
    yardsdrive_off_rank?:               number;
    playsdrive_off_rank?:               number;
    play_stuffed_off_rank?:             number;
    red_zone_success_off_rank?:         number;
    third_down_success_off_rank?:       number;
    start_position_off_rank?:           number;
    havoc_off_rank?:                    number;
    explosive_off_rank?:                number;
    passrate_off_rank?:                 number;
    rushrate_off_rank?:                 number;
    plays_def?:                         number;
    playsgame_def?:                     number;
    passrate_def?:                      number;
    rushrate_def?:                      number;
    havoc_def?:                         number;
    explosive_def?:                     number;
    TEPA_def?:                          number;
    EPAplay_def?:                       number;
    EPAgame_def?:                       number;
    yards_def?:                         number;
    yardsplay_def?:                     number;
    yardsgame_def?:                     number;
    play_stuffed_def?:                  number;
    drives_def?:                        number;
    drivesgame_def?:                    number;
    yardsdrive_def?:                    number;
    playsdrive_def?:                    number;
    success_def?:                       number;
    red_zone_success_def?:              number;
    third_down_success_def?:            number;
    start_position_def?:                number;
    playsgame_def_rank?:                number;
    TEPA_def_rank?:                     number;
    EPAgame_def_rank?:                  number;
    EPAplay_def_rank?:                  number;
    success_def_rank?:                  number;
    yards_def_rank?:                    number;
    yardsplay_def_rank?:                number;
    yardsgame_def_rank?:                number;
    drivesgame_rank?:                   number;
    yardsdrive_def_rank?:               number;
    playsdrive_def_rank?:               number;
    play_stuffed_def_rank?:             number;
    red_zone_success_def_rank?:         number;
    third_down_success_def_rank?:       number;
    start_position_def_rank?:           number;
    havoc_def_rank?:                    number;
    explosive_def_rank?:                number;
    passrate_def_rank?:                 number;
    rushrate_def_rank?:                 number;
    TEPA_margin?:                       number;
    EPAplay_margin?:                    number;
    EPAgame_margin?:                    number;
    success_margin?:                    number;
    yardsplay_margin?:                  number;
    TEPA_margin_rank?:                  number;
    EPAgame_margin_rank?:               number;
    EPAplay_margin_rank?:               number;
    success_margin_rank?:               number;
    yardsplay_margin_rank?:             number;
    start_position_margin?:             number;
    start_position_margin_rank?:        number;
    total_available_yards_off?:         number;
    total_gained_yards_off?:            number;
    available_yards_pct_off?:           number;
    total_available_yards_def?:         number;
    total_gained_yards_def?:            number;
    available_yards_pct_def?:           number;
    total_available_yards_margin?:      number;
    total_gained_yards_margin?:         number;
    available_yards_pct_margin?:        number;
    total_available_yards_margin_rank?: number;
    total_gained_yards_margin_rank?:    number;
    available_yards_pct_margin_rank?:   number;
    plays_off_pass?:                    number;
    playsgame_off_pass?:                number;
    passrate_off_pass?:                 number;
    rushrate_off_pass?:                 number;
    havoc_off_pass?:                    number;
    explosive_off_pass?:                number;
    TEPA_off_pass?:                     number;
    EPAplay_off_pass?:                  number;
    EPAgame_off_pass?:                  number;
    yards_off_pass?:                    number;
    yardsplay_off_pass?:                number;
    yardsgame_off_pass?:                number;
    play_stuffed_off_pass?:             number;
    drives_off_pass?:                   number;
    drivesgame_off_pass?:               number;
    yardsdrive_off_pass?:               number;
    playsdrive_off_pass?:               number;
    success_off_pass?:                  number;
    red_zone_success_off_pass?:         number;
    third_down_success_off_pass?:       number;
    playsgame_off_pass_rank?:           number;
    TEPA_off_pass_rank?:                number;
    EPAgame_off_pass_rank?:             number;
    EPAplay_off_pass_rank?:             number;
    success_off_pass_rank?:             number;
    yards_off_pass_rank?:               number;
    yardsplay_off_pass_rank?:           number;
    yardsgame_off_pass_rank?:           number;
    yardsdrive_off_pass_rank?:          number;
    playsdrive_off_pass_rank?:          number;
    play_stuffed_off_pass_rank?:        number;
    red_zone_success_off_pass_rank?:    number;
    third_down_success_off_pass_rank?:  number;
    havoc_off_pass_rank?:               number;
    explosive_off_pass_rank?:           number;
    passrate_off_pass_rank?:            number;
    rushrate_off_pass_rank?:            number;
    plays_def_pass?:                    number;
    playsgame_def_pass?:                number;
    passrate_def_pass?:                 number;
    rushrate_def_pass?:                 number;
    havoc_def_pass?:                    number;
    explosive_def_pass?:                number;
    TEPA_def_pass?:                     number;
    EPAplay_def_pass?:                  number;
    EPAgame_def_pass?:                  number;
    yards_def_pass?:                    number;
    yardsplay_def_pass?:                number;
    yardsgame_def_pass?:                number;
    play_stuffed_def_pass?:             number;
    drives_def_pass?:                   number;
    drivesgame_def_pass?:               number;
    yardsdrive_def_pass?:               number;
    playsdrive_def_pass?:               number;
    success_def_pass?:                  number;
    red_zone_success_def_pass?:         number;
    third_down_success_def_pass?:       number;
    playsgame_def_pass_rank?:           number;
    TEPA_def_pass_rank?:                number;
    EPAgame_def_pass_rank?:             number;
    EPAplay_def_pass_rank?:             number;
    success_def_pass_rank?:             number;
    yards_def_pass_rank?:               number;
    yardsplay_def_pass_rank?:           number;
    yardsgame_def_pass_rank?:           number;
    drivesgame_pass_rank?:              number;
    yardsdrive_def_pass_rank?:          number;
    playsdrive_def_pass_rank?:          number;
    play_stuffed_def_pass_rank?:        number;
    red_zone_success_def_pass_rank?:    number;
    third_down_success_def_pass_rank?:  number;
    havoc_def_pass_rank?:               number;
    explosive_def_pass_rank?:           number;
    passrate_def_pass_rank?:            number;
    rushrate_def_pass_rank?:            number;
    TEPA_margin_pass?:                  number;
    EPAplay_margin_pass?:               number;
    EPAgame_margin_pass?:               number;
    success_margin_pass?:               number;
    yardsplay_margin_pass?:             number;
    TEPA_margin_pass_rank?:             number;
    EPAgame_margin_pass_rank?:          number;
    EPAplay_margin_pass_rank?:          number;
    success_margin_pass_rank?:          number;
    yardsplay_margin_pass_rank?:        number;
    plays_off_rush?:                    number;
    playsgame_off_rush?:                number;
    passrate_off_rush?:                 number;
    rushrate_off_rush?:                 number;
    havoc_off_rush?:                    number;
    explosive_off_rush?:                number;
    TEPA_off_rush?:                     number;
    EPAplay_off_rush?:                  number;
    EPAgame_off_rush?:                  number;
    yards_off_rush?:                    number;
    yardsplay_off_rush?:                number;
    yardsgame_off_rush?:                number;
    play_stuffed_off_rush?:             number;
    drives_off_rush?:                   number;
    drivesgame_off_rush?:               number;
    yardsdrive_off_rush?:               number;
    playsdrive_off_rush?:               number;
    success_off_rush?:                  number;
    red_zone_success_off_rush?:         number;
    third_down_success_off_rush?:       number;
    playsgame_off_rush_rank?:           number;
    TEPA_off_rush_rank?:                number;
    EPAgame_off_rush_rank?:             number;
    EPAplay_off_rush_rank?:             number;
    success_off_rush_rank?:             number;
    yards_off_rush_rank?:               number;
    yardsplay_off_rush_rank?:           number;
    yardsgame_off_rush_rank?:           number;
    yardsdrive_off_rush_rank?:          number;
    playsdrive_off_rush_rank?:          number;
    play_stuffed_off_rush_rank?:        number;
    red_zone_success_off_rush_rank?:    number;
    third_down_success_off_rush_rank?:  number;
    havoc_off_rush_rank?:               number;
    explosive_off_rush_rank?:           number;
    passrate_off_rush_rank?:            number;
    rushrate_off_rush_rank?:            number;
    plays_def_rush?:                    number;
    playsgame_def_rush?:                number;
    passrate_def_rush?:                 number;
    rushrate_def_rush?:                 number;
    havoc_def_rush?:                    number;
    explosive_def_rush?:                number;
    TEPA_def_rush?:                     number;
    EPAplay_def_rush?:                  number;
    EPAgame_def_rush?:                  number;
    yards_def_rush?:                    number;
    yardsplay_def_rush?:                number;
    yardsgame_def_rush?:                number;
    play_stuffed_def_rush?:             number;
    drives_def_rush?:                   number;
    drivesgame_def_rush?:               number;
    yardsdrive_def_rush?:               number;
    playsdrive_def_rush?:               number;
    success_def_rush?:                  number;
    red_zone_success_def_rush?:         number;
    third_down_success_def_rush?:       number;
    playsgame_def_rush_rank?:           number;
    TEPA_def_rush_rank?:                number;
    EPAgame_def_rush_rank?:             number;
    EPAplay_def_rush_rank?:             number;
    success_def_rush_rank?:             number;
    yards_def_rush_rank?:               number;
    yardsplay_def_rush_rank?:           number;
    yardsgame_def_rush_rank?:           number;
    drivesgame_rush_rank?:              number;
    yardsdrive_def_rush_rank?:          number;
    playsdrive_def_rush_rank?:          number;
    play_stuffed_def_rush_rank?:        number;
    red_zone_success_def_rush_rank?:    number;
    third_down_success_def_rush_rank?:  number;
    havoc_def_rush_rank?:               number;
    explosive_def_rush_rank?:           number;
    passrate_def_rush_rank?:            number;
    rushrate_def_rush_rank?:            number;
    TEPA_margin_rush?:                  number;
    EPAplay_margin_rush?:               number;
    EPAgame_margin_rush?:               number;
    success_margin_rush?:               number;
    yardsplay_margin_rush?:             number;
    TEPA_margin_rush_rank?:             number;
    EPAgame_margin_rush_rank?:          number;
    EPAplay_margin_rush_rank?:          number;
    success_margin_rush_rank?:          number;
    yardsplay_margin_rush_rank?:        number;
}



export type Players = {
    passing:   Passing[];
    rushing:   Receiving[];
    receiving: Receiving[];
}

export type Passing = {
    team_id?:             number;
    pos_team?:            string;
    abbreviation?:        string;
    season?:              number;
    passer_player_name:   string;
    player_id?:           number;
    plays:                number;
    games?:               number;
    playsgame?:           number;
    TEPA?:                number;
    EPAplay?:             number;
    EPAgame?:             number;
    yards?:               number;
    yardsplay?:           number;
    yardsgame?:           number;
    success?:             number;
    comp?:                number;
    att?:                 number;
    comppct?:             number;
    passing_td?:          number;
    sacked?:              number;
    sack_yds?:            number;
    pass_int?:            number;
    detmer?:              number;
    detmergame?:          number;
    dropbacks?:           number;
    sack_adj_yards?:      number;
    yardsdropback?:       number;
    TEPA_rank?:           number;
    EPAgame_rank?:        number;
    EPAplay_rank?:        number;
    success_rank?:        number;
    comppct_rank?:        number;
    yards_rank?:          number;
    yardsplay_rank?:      number;
    yardsgame_rank?:      number;
    sack_adj_yards_rank?: number;
    yardsdropback_rank?:  number;
    detmer_rank?:         number;
    detmergame_rank?:     number;
}

export type Receiving = {
    team_id?:              number;
    pos_team?:             string;
    abbreviation?:         string;
    season?:               number;
    receiver_player_name:  string;
    player_id?:            number | null;
    plays:                 number;
    games?:                number;
    playsgame?:            number;
    TEPA?:                 number;
    EPAplay?:              number;
    EPAgame?:              number;
    yards?:                number;
    yardsplay?:            number;
    yardsgame?:            number;
    success?:              number;
    comp?:                 number;
    targets?:              number;
    catchpct?:             number;
    passing_td?:           number;
    fumbles?:              number;
    TEPA_rank?:            number;
    EPAgame_rank?:         number;
    EPAplay_rank?:         number;
    success_rank?:         number;
    catchpct_rank?:        number;
    yards_rank?:           number;
    yardsplay_rank?:       number;
    yardsgame_rank?:       number;
    rusher_player_name:    string;
    rushing_td?:           number;
}



export enum BreakdownAbbreviation {
    Uga = "UGA",
}



export type TeamData = {
    $ref?:                    string;
    id:                       string;
    guid?:                    string;
    uid?:                     string;
    alternateIds?:            AlternateIDS;
    slug?:                    string;
    location:                 string;
    name:                     string;
    nickname:                 string;
    abbreviation:             string;
    displayName:              string;
    shortDisplayName?:        string;
    color?:                   string;
    alternateColor?:          string;
    isActive?:                boolean;
    isAllStar?:               boolean;
    logos:                    Logo[];
    record:                   RecordTeam[];
    oddsRecords?:             OddsRecords;
    athletes?:                any[];
    venue?:                   OddsRecords;
    groups?:                  AgainstTheSpreadRecords;
    ranks?:                   any[];
    statistics?:              OddsRecords;
    leaders?:                 null;
    links?:                   any[];
    injuries?:                AgainstTheSpreadRecords;
    notes?:                   AgainstTheSpreadRecords;
    againstTheSpreadRecords?: AgainstTheSpreadRecords;
    awards?:                  AgainstTheSpreadRecords;
    franchise?:               AgainstTheSpreadRecords;
    projection?:              AgainstTheSpreadRecords;
    events?:                  Event[];
    coaches?:                 AgainstTheSpreadRecords;
    college?:                 AgainstTheSpreadRecords;
}

export type AgainstTheSpreadRecords = {
    $ref?: string;
}

export type AlternateIDS = {
    sdr?: string;
}

export type Event = {
    id?:                       string;
    date?:                     string;
    attendance?:               number;
    time_valid?:               boolean;
    neutral_site?:             boolean;
    boxscore_available?:       boolean;
    tickets_available?:        boolean;
    competitors?:              CompetitorTeam[];
    notes_type?:               NotesType;
    notes_headline?:           string;
    type_id?:                  string;
    type_text?:                TypeText;
    type_abbreviation?:        TypeAbbreviation;
    type_slug?:                TypeSlugEnum;
    type_type?:                TypeSlugEnum;
    venue_full_name?:          string;
    venue_address_city?:       string;
    venue_address_state?:      string;
    venue_address_zip_code?:   string;
    status_clock?:             number;
    status_display_clock?:     StatusDisplayClock;
    status_period?:            number;
    status_type_id?:           string;
    status_type_name?:         StatusTypeName;
    status_type_state?:        StatusTypeState;
    status_type_completed?:    boolean;
    status_type_description?:  StatusType;
    status_type_detail?:       StatusType;
    status_type_short_detail?: StatusType;
    home_id?:                  string;
    home_location?:            string;
    home_nickname?:            string;
    home_abbreviation?:        string;
    home_display_name?:        string;
    home_short_display_name?:  string;
    home_logos?:               Logo[];
    home_score_value?:         number;
    home_score_display_value?: string;
    home_winner?:              boolean;
    home_current_rank?:        number;
    home_linescores?:          any[];
    home_records?:             AwayRecord[];
    home_logo?:                string;
    away_id?:                  string;
    away_location?:            string;
    away_nickname?:            string;
    away_abbreviation?:        string;
    away_display_name?:        string;
    away_short_display_name?:  string;
    away_logos?:               Logo[];
    away_score_value?:         number;
    away_score_display_value?: string;
    away_winner?:              boolean;
    away_current_rank?:        number;
    away_linescores?:          any[];
    away_records?:             AwayRecord[];
    away_logo?:                string;
    game_id?:                  number;
    season?:                   number;
    season_type?:              null;
    week?:                     number;
    home_dark_logo?:           string;
    away_dark_logo?:           string;
}

export type Logo = {
    href:         string;
    width?:       number;
    height?:      number;
    alt?:         string;
    rel?:         LogoRel[];
    lastUpdated?: string;
}

export enum LogoRel {
    Dark = "dark",
    Default = "default",
    Full = "full",
}

export type AwayRecord = {
    id?:               string;
    abbreviation?:     string;
    displayName?:      string;
    shortDisplayName?: string;
    description?:      string;
    type?:             string;
    displayValue?:     string;
    name?:             string;
    value?:            number;
}

export type CompetitorTeam = {
    id?:          string;
    type?:        Type;
    order?:       number;
    homeAway?:    HomeAway;
    winner?:      boolean;
    team?:        Team;
    score?:       Score;
    leaders?:     CompetitorLeader[];
    record?:      AwayRecord[];
    curatedRank?: CuratedRank;
}

export type CuratedRank = {
    current?: number;
}

export enum HomeAway {
    Away = "away",
    Home = "home",
}

export type CompetitorLeader = {
    name?:         string;
    displayName?:  string;
    abbreviation?: LeaderAbbreviation;
    leaders?:      LeaderLeader[];
}

export enum LeaderAbbreviation {
    Cmp = "CMP",
    ESPNRating = "ESPNRating",
    F = "F",
    FL = "FL",
    Int = "INT",
    Kr = "KR",
    P = "P",
    PR = "PR",
    Pyds = "PYDS",
    Rat = "RAT",
    Rec = "REC",
    Recyds = "RECYDS",
    Ryds = "RYDS",
    Td = "TD",
    Tot = "TOT",
    Tp = "TP",
    Yds = "YDS",
}

export type LeaderLeader = {
    displayValue?: string;
    value?:        number;
    athlete?:      Athlete;
}

export type Athlete = {
    id?:          string;
    lastName?:    string;
    displayName?: string;
    shortName?:   string;
    links?:       Link[];
}

export type Link = {
    rel?:  LinkRel[];
    href?: string;
}

export enum LinkRel {
    Athlete = "athlete",
    Bio = "bio",
    Desktop = "desktop",
    Gamelog = "gamelog",
    News = "news",
    Overview = "overview",
    Playercard = "playercard",
    Splits = "splits",
    Stats = "stats",
}

export type Score = {
    value?:        number;
    displayValue?: string;
}

export type Team = {
    id?:               string;
    location?:         string;
    nickname?:         string;
    abbreviation?:     string;
    displayName?:      string;
    shortDisplayName?: string;
    logos?:            Logo[];
    score?:            Score;
    winner?:           boolean;
    currentRank?:      number;
    linescores?:       any[];
    records?:          AwayRecord[];
    logo?:             string;
}

export enum Type {
    Team = "team",
}

export enum NotesType {
    Empty = "",
    Event = "event",
}

export enum StatusDisplayClock {
    The000 = "0:00",
}


export enum StatusTypeName {
    StatusFinal = "STATUS_FINAL",
}

export enum StatusTypeState {
    Post = "post",
}

export enum TypeAbbreviation {
    Std = "STD",
}

export enum TypeSlugEnum {
    Standard = "standard",
}

export enum TypeText {
    Standard = "Standard",
}

export type OddsRecords = {
}

export type RecordTeam = {
    $ref?:             string;
    id?:               string;
    name?:             string;
    abbreviation?:     string;
    displayName?:      string;
    shortDisplayName?: string;
    description?:      string;
    type?:             string;
    summary?:          string;
    displayValue?:     string;
    value?:            number;
    stats?:            AwayRecord[];
}





export type CFBGame = {
    id?:                 string;
    count?:              number;
    gei:                 number;
    plays?:              CFBGamePlay[];
    percentiles?:        { [key: string]: number }[];
    advBoxScore?:        BoxScoreClass;
    homeTeamId?:         string;
    awayTeamId?:         string;
    drives?:             Drives;
    scoringPlays?:       CFBGamePlay[];
    mostImportantPlays?: CFBGamePlay[];
    bigPlays?:           CFBGamePlay[];
    winprobability?:     Winprobability[];
    boxScore?:           BoxScore;
    homeTeamSpread:      number;
    overUnder:           number;
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

export interface BoxScoreClassFilter extends BoxScoreClass {
    [key: string]: any;
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
    pos_team:                       number;
    drive_total_available_yards?:   number;
    drive_total_gained_yards?:      number;
    avg_field_position?:            number;
    plays_per_drive?:               number;
    yards_per_drive?:               number;
    drives?:                        number;
    drive_total_gained_yards_rate?: number;
}

export type Pass = {
    pos_team:            number;
    passer_player_name:  string;
    Comp:                number;
    Att:                 number;
    Yds:                 number;
    Pass_TD:             number;
    Int:                 number;
    YPA:                 number;
    EPA:                 number;
    EPA_per_Play:        number;
    WPA:                 number;
    SR:                  number;
    Sck:                 number;
    athlete_name:        string;
    qbr_epa:             number;
    sack_epa:            number;
    pass_epa:            number;
    rush_epa:            number;
    pen_epa:             number;
    spread:              number;
    exp_qbr:             number;
}

export enum Name {
    JaydenDaniels = "Jayden Daniels",
    JordanTravis = "Jordan Travis",
    Team = "TEAM",
}

export type Receiver = {
    pos_team:              number;
    receiver_player_name:  string;
    Rec:                   number;
    Tar:                   number;
    Yds:                   number;
    Rec_TD:                number;
    YPT:                   number | null;
    EPA:                   number;
    EPA_per_Play:          number;
    WPA:                   number;
    SR:                    number;
    Fum:                   number;
    Fum_Lost:              number;
}

export type Rush = {
    pos_team:            number;
    rusher_player_name:  string;
    Car:                 number;
    Yds:                 number;
    Rush_TD:             number;
    YPC:                 number;
    EPA:                 number;
    EPA_per_Play:        number;
    WPA:                 number;
    SR:                  number;
    Fum:                 number;
    Fum_Lost:            number;
}

export type Turnover = {
    pos_team:                  number;
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
    season:        Season;
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
    color:           string;
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
    year:  number;
    type:  number;
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
    start: ModelInputsEnd;
    end:   ModelInputsEnd;
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
    pos_team_receives_2H_kickoff:  boolean;
    is_home:                       boolean;
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