package com.example.tvshowapi.dto;

import java.util.List;

public class TVShowResponse {
    private Integer id;
    private String url;
    private String name;
    private String type;
    private String language;
    private List<String> genres;
    private String status;
    private Integer runtime;
    private Integer averageRuntime;
    private String premiered;
    private String ended;
    private String officialSite;
    private Schedule schedule;
    private Rating rating;
    private Integer weight;
    private Network network;
    private Object webChannel;
    private Object dvdCountry;
    private Externals externals;
    private Image image;
    private String summary;
    private Integer updated;
    private Links links;

    // Getters
    public Integer getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getLanguage() {
        return language;
    }

    public List<String> getGenres() {
        return genres;
    }

    public String getStatus() {
        return status;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public Integer getAverageRuntime() {
        return averageRuntime;
    }

    public String getPremiered() {
        return premiered;
    }

    public String getEnded() {
        return ended;
    }

    public String getOfficialSite() {
        return officialSite;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public Rating getRating() {
        return rating;
    }

    public Integer getWeight() {
        return weight;
    }

    public Network getNetwork() {
        return network;
    }

    public Object getWebChannel() {
        return webChannel;
    }

    public Object getDvdCountry() {
        return dvdCountry;
    }

    public Externals getExternals() {
        return externals;
    }

    public Image getImage() {
        return image;
    }

    public String getSummary() {
        return summary;
    }

    public Integer getUpdated() {
        return updated;
    }

    public Links getLinks() {
        return links;
    }    

    public static class Schedule {
        private String time;
        private List<String> days;

        public String getTime() {
            return time;
        }

        public List<String> getDays() {
            return days;
        }
    }

    public static class Rating {
        private Double average;

        public Double getAverage() {
            return average;
        }
    }

    public static class Network {
        private Integer id;
        private String name;
        private String officialSite;
        private Country country;

        public Integer getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public String getOfficialSite() {
            return officialSite;
        }

        public Country getCountry() {
            return country;
        }
    }

    public static class Externals {
        private Integer tvrage;
        private Integer thetvdb;
        private String imdb;

        public Integer getTvrage() {
            return tvrage;
        }

        public Integer getThetvdb() {
            return thetvdb;
        }

        public String getImdb() {
            return imdb;
        }
    }

    public static class Image {
        private String medium;
        private String original;

        public String getMedium() {
            return medium;
        }

        public String getOriginal() {
            return original;
        }
    }

    public static class Country {
        private String name;
        private String code;
        private String timezone;

        public String getName() {
            return name;
        }

        public String getCode() {
            return code;
        }

        public String getTimezone() {
            return timezone;
        }
    }

    public static class Links {
        private Self self;
        private PreviousEpisode previousepisode;

        public Self getSelf() {
            return self;
        }

        public PreviousEpisode getPreviousepisode() {
            return previousepisode;
        }
    }

    public static class Self {
        private String href;

        public String getHref() {
            return href;
        }
    }

    public static class PreviousEpisode {
        private String href;
        private String name;

        public String getHref() {
            return href;
        }

        public String getName() {
            return name;
        }
    }
}
