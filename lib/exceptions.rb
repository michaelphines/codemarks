module Exceptions
  class LinkRequiredError < StandardError; end
  class TopicsRequiredError < StandardError; end
  class UserRequiredError < StandardError; end
  class AuthHashRequiredError < StandardError; end
  class AuthProviderRequiredError < StandardError; end
  class ValidURLRequiredError < StandardError; end
  class InvalidLinkError < StandardError; end
end
