class Topic < ActiveRecord::Base
  extend FriendlyId

  paginates_per 5

  friendly_id :title, :use => :slugged

  validates_presence_of :title
  validates_uniqueness_of :title

  has_many :link_topics
  has_many :links, :through => :link_topics
  has_many :sponsored_sites, :inverse_of => :topic, :dependent => :destroy
  accepts_nested_attributes_for :sponsored_sites, :reject_if => lambda {|s| s[:url].blank? || s[:site].blank? }

  scope :mine, lambda { |user_id| 
                joins('INNER JOIN link_topics mylt on mylt.topic_id = topics.id')
                .joins('INNER JOIN link_saves on link_saves.link_id = mylt.link_id')
                .where(['link_saves.user_id = ?', user_id]) }

  scope :by_resource_count, select("topics.*")
                          .joins("LEFT JOIN link_topics ON link_topics.topic_id = topics.id")
                          .group("link_topics.topic_id")
                          .order("count(link_topics.id) DESC")


  scope :by_recent_activity, select('DISTINCT topics.*')
                            .joins('LEFT JOIN link_topics ON link_topics.topic_id = topics.id')
                            .order('link_topics.created_at DESC')

  def resource_count current_user_id, filter_by_mine
    if current_user_id.nil?
      self.links.public.count
    elsif filter_by_mine
      self.links.mine(current_user_id).count
    else
      self.links.public_or_mine(current_user_id).count
    end
  end

end

