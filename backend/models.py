from sqlalchemy import Column, Integer, String, DateTime, func, Boolean, ForeignKey, Table, Enum, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from database import Base

class HabitFrequency(str, enum.Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    CUSTOM = "custom"

class HabitCategory(str, enum.Enum):
    HEALTH = "health"
    FITNESS = "fitness"
    PRODUCTIVITY = "productivity"
    LEARNING = "learning"
    MINDFULNESS = "mindfulness"
    OTHER = "other"

# Association table for many-to-many relationship between users and habits
user_habits = Table(
    "user_habits",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("habit_id", Integer, ForeignKey("habits.id")),
)

class TestTable(Base):
    """
    A test table to verify database connection.
    """
    __tablename__ = "test_table"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class User(Base):
    """
    User model for authentication and basic user information.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=True)  # Nullable for OAuth users
    is_active = Column(Boolean, default=True)
    points = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    oauth_provider = Column(String, nullable=True)  # Store OAuth provider (google, apple)
    oauth_id = Column(String, nullable=True)  # Store OAuth provider's user ID
    profile_picture = Column(String, nullable=True)  # Store profile picture URL from OAuth

    # Relationships
    habits = relationship("Habit", back_populates="user")
    streaks = relationship("Streak", back_populates="user")
    completions = relationship("HabitCompletion", back_populates="user")
    rewards = relationship("Reward", back_populates="user")
    badges = relationship("Badge", back_populates="user")

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    frequency = Column(Enum(HabitFrequency))
    category = Column(Enum(HabitCategory))
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    is_active = Column(Boolean, default=True)

    # Relationships
    user = relationship("User", back_populates="habits")
    completions = relationship("HabitCompletion", back_populates="habit")
    streaks = relationship("Streak", back_populates="habit")

class Streak(Base):
    __tablename__ = "streaks"

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    current_streak = Column(Integer, default=0)
    longest_streak = Column(Integer, default=0)
    last_completion_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    habit = relationship("Habit", back_populates="streaks")
    user = relationship("User", back_populates="streaks")

class HabitCompletion(Base):
    __tablename__ = "habit_completions"

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    completed_at = Column(DateTime(timezone=True), server_default=func.now())
    notes = Column(Text, nullable=True)

    # Relationships
    habit = relationship("Habit", back_populates="completions")
    user = relationship("User", back_populates="completions")

class Reward(Base):
    __tablename__ = "rewards"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    points_required = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))
    is_claimed = Column(Boolean, default=False)
    claimed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="rewards")

class Badge(Base):
    __tablename__ = "badges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    icon = Column(String)  # URL or icon identifier
    user_id = Column(Integer, ForeignKey("users.id"))
    earned_at = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="badges")

# Association table for many-to-many relationship between users and badges
user_badges = Table(
    "user_badges",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("badge_id", Integer, ForeignKey("badges.id")),
) 