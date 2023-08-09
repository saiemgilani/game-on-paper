import { Variants } from "framer-motion";
import React from "react";



export type ScoreboardEvent = {
    id?:                        string;
    uid?:                       string;
    date:                      string;
    attendance?:                number;
    time_valid?:                boolean;
    neutral_site?:              boolean;
    conference_competition?:    boolean;
    play_by_play_available?:    boolean;
    boxscore_available?:        boolean;
    recent?:                    boolean;
    competitors?:               Competitor[];
    start_date?:                string;
    notes_type?:                string;
    notes_headline?:            string;
    broadcast_market?:          string;
    broadcast_name:             string;
    type_id?:                   string;
    type_abbreviation?:         string;
    venue_id?:                  string;
    venue_full_name?:           string;
    venue_address_city?:        string;
    venue_address_state?:       string;
    venue_capacity?:            number;
    venue_indoor?:              boolean;
    status_clock?:              number;
    status_display_clock?:      string;
    status_period?:             number;
    status_type_id?:            string;
    status_type_name?:          string;
    status_type_state:         string;
    status_type_completed?:     boolean;
    status_type_description:   string;
    status_type_detail:        string;
    status_type_short_detail?:  string;
    format_regulation_periods?: number;
    home_id?:                   string;
    home_uid?:                  string;
    home_location?:             string;
    home_name:                 string;
    home_abbreviation:         string;
    home_display_name:         string;
    home_short_display_name:   string;
    home_color?:                string;
    home_alternate_color?:      string;
    home_is_active?:            boolean;
    home_venue_id?:             string;
    home_logo:                 string;
    home_dark_logo:            string;
    home_conference_id:        string;
    home_score:                string;
    home_score_value?:          number;
    home_current_rank?:         number;
    home_linescores:           any[];
    home_records:              any[];
    away_id?:                   string;
    away_uid?:                  string;
    away_location?:             string;
    away_name:                 string;
    away_abbreviation:         string;
    away_display_name:         string;
    away_short_display_name:   string;
    away_color?:                string;
    away_alternate_color?:      string;
    away_is_active?:            boolean;
    away_venue_id?:             string;
    away_logo:                 string;
    away_dark_logo:            string;
    away_conference_id:        string;
    away_score:                string;
    away_score_value?:          number;
    away_winner:               null;
    away_current_rank?:         string;
    away_linescores:           any[];
    away_records:              any[];
    game_id:                   number;
    season?:                    number;
    season_type?:               number;
    week?:                      number;
    groups_id?:                 null;
    groups_name?:               null;
    groups_short_name?:         null;
    groups_is_conference?:      null;
}

export type Competitor = {
  id?:          string;
  uid?:         string;
  type?:        string;
  order?:       number;
  homeAway?:    string;
  team?:        Team;
  score?:       string;
  curatedRank?: CuratedRank;
  statistics?:  any[];
}

export type CuratedRank = {
  current?: number;
}

export type Team = {
  id?:               string;
  uid?:              string;
  location?:         string;
  name?:             string;
  abbreviation?:     string;
  displayName?:      string;
  shortDisplayName?: string;
  color?:            string;
  alternateColor?:   string;
  isActive?:         boolean;
  venue?:            Venue;
  logo?:             string;
  conferenceId?:     string;
  score?:            string;
  winner?:           null;
  currentRank?:      number | string;
  linescores?:       any[];
  records?:          any[];
}

export type Venue = {
  id?: string;
}

export type ScoreData = {
  id: string
  content: string
  date: string
  title: string
  description: string
}

export type ScoreCardProps = {
  className?: string
  score: ScoreData
  sport: string
  noMargin?: boolean
}



/* Custom Animated Components types */
export type AnimatedTAGProps = {
  variants: Variants;
  className?: string;
  children: React.ReactNode;
  infinity?: boolean;
};

export interface NavItem {
  title: string
  href?: string
  dropdown?: boolean
  items?: NavItem[]
  disabled?: boolean
  external?: boolean
}

export type TableOfContents = {
  level: number;
  heading: string;
};



export type FormInput = {
  to_name: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
};


export type GithubRepo = {
  stargazers_count: number;
  fork: boolean;
  forks_count: number;
};

export type PageData = {
  title: string;
  description: string;
  image: string;
  keywords: string;
};

export type subscriptionURL = {
  url: string;
};

export type mongoClient = {
  client: any;
  db: any;
};