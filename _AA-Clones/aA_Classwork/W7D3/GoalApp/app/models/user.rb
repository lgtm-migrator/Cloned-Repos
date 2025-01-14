class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true
    validates :session_token, presence: true
    validates :password_digest, presence: true

    attr_reader :password
    after_initialize :ensure_session_token

    # def self.generate_session_token

    # end

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        user && user.is_password?(password) ? user : nil
    end

    def password=(password)
        self.password_digest = BCrypt::Password.create(password)
        @password = password
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
       self.session_token = SecureRandom.urlsafe_base64(16)
       self.save!
       self.session_token
        
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64(16)
    end
end
