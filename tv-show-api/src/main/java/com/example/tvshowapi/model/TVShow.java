package com.example.tvshowapi.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "tv_shows")
public class TVShow {

    @Id
    private Long id;
    private String url;
    private String name;
    private String type;
    private String language;

    @Column(name = "genre")
    private List<String> genres;

    private String status;
    private Integer runtime;
    private Integer averageRuntime;
    private String premiered;
    private String ended;
    private String officialSite;
    private Integer weight;
    private String dvdCountry;
    private Long updated;

    @Embedded
    private Schedule schedule;

    @Embedded
    private Rating rating;

    @Embedded
    private WebChannel webChannel;

    @Embedded
    private Externals externals;

    @Embedded
    private Image image;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String summary;

    @Embedded
    private Links links;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }

    public Integer getAverageRuntime() {
        return averageRuntime;
    }

    public void setAverageRuntime(Integer averageRuntime) {
        this.averageRuntime = averageRuntime;
    }

    public String getPremiered() {
        return premiered;
    }

    public void setPremiered(String premiered) {
        this.premiered = premiered;
    }

    public String getEnded() {
        return ended;
    }

    public void setEnded(String ended) {
        this.ended = ended;
    }

    public String getOfficialSite() {
        return officialSite;
    }

    public void setOfficialSite(String officialSite) {
        this.officialSite = officialSite;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public String getDvdCountry() {
        return dvdCountry;
    }

    public void setDvdCountry(String dvdCountry) {
        this.dvdCountry = dvdCountry;
    }

    public Long getUpdated() {
        return updated;
    }

    public void setUpdated(Long updated) {
        this.updated = updated;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public WebChannel getWebChannel() {
        return webChannel;
    }

    public void setWebChannel(WebChannel webChannel) {
        this.webChannel = webChannel;
    }

    public Externals getExternals() {
        return externals;
    }

    public void setExternals(Externals externals) {
        this.externals = externals;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Links getLinks() {
        return links;
    }

    public void setLinks(Links links) {
        this.links = links;
    }
}

@Embeddable
class Schedule {
    private String time;

    private List<String> days;

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public List<String> getDays() {
        return days;
    }

    public void setDays(List<String> days) {
        this.days = days;
    }
}

@Embeddable
class Rating {
    private Double average;

    public Double getAverage() {
        return average;
    }

    public void setAverage(Double average) {
        this.average = average;
    }
}

@Embeddable
class WebChannel {
    @Column(name = "webchannel_id")
    private Integer id;

    @Column(name = "webchannel_name")
    private String name;

    @Column(name = "webchannel_official_site")
    private String officialSite;

    @Embedded
    @AttributeOverride(name = "name", column = @Column(name = "country_name"))
    @AttributeOverride(name = "code", column = @Column(name = "country_code"))
    @AttributeOverride(name = "timezone", column = @Column(name = "country_timezone"))
    private Country country;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOfficialSite() {
        return officialSite;
    }

    public void setOfficialSite(String officialSite) {
        this.officialSite = officialSite;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}

@Embeddable
class Country {
    @Column(name = "country_name")
    private String name;

    @Column(name = "country_code")
    private String code;

    @Column(name = "country_timezone")
    private String timezone;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }
}

@Embeddable
class Externals {
    private Integer tvrage;
    private Integer thetvdb;
    private String imdb;

    public Integer getTvrage() {
        return tvrage;
    }

    public void setTvrage(Integer tvrage) {
        this.tvrage = tvrage;
    }

    public Integer getThetvdb() {
        return thetvdb;
    }

    public void setThetvdb(Integer thetvdb) {
        this.thetvdb = thetvdb;
    }

    public String getImdb() {
        return imdb;
    }

    public void setImdb(String imdb) {
        this.imdb = imdb;
    }
}

@Embeddable
class Image {
    private String medium;
    private String original;

    public String getMedium() {
        return medium;
    }

    public void setMedium(String medium) {
        this.medium = medium;
    }

    public String getOriginal() {
        return original;
    }

    public void setOriginal(String original) {
        this.original = original;
    }
}

@Embeddable
class Links {

    @Embedded
    @AttributeOverride(name = "href", column = @Column(name = "self_href"))
    @AttributeOverride(name = "name", column = @Column(name = "self_link_name"))
    private Link self;

    @Embedded
    @AttributeOverride(name = "href", column = @Column(name = "previousepisode_href"))
    @AttributeOverride(name = "name", column = @Column(name = "previousepisode_link_name"))
    private Link previousepisode;

    public Link getSelf() {
        return self;
    }

    public void setSelf(Link self) {
        this.self = self;
    }

    public Link getPreviousepisode() {
        return previousepisode;
    }

    public void setPreviousepisode(Link previousepisode) {
        this.previousepisode = previousepisode;
    }
}

@Embeddable
class Link {
    private String href;
    @Column(name = "link_name")
    private String name;

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
