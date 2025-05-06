from sqlalchemy import Column, Integer, String, DateTime, func, Boolean, ForeignKey, Table, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from database import Base

class HabitFrequency(enum.Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"

class HabitCategory(enum.Enum):
    HEALTH = "health"
    FITNESS = "fitness"
    LEARNING = "learning"
    PRODUCTIVITY = "productivity"
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
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    points = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    habits = relationship("Habit", secondary=user_habits, back_populates="users")
    streaks = relationship("Streak", back_populates="user")
    rewards = relationship("Reward", back_populates="user")

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    frequency = Column(Enum(HabitFrequency))
    category = Column(Enum(HabitCategory))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    users = relationship("User", secondary=user_habits, back_populates="habits")
    streaks = relationship("Streak", back_populates="habit")
    completions = relationship("HabitCompletion", back_populates="habit")

class Streak(Base):
    __tablename__ = "streaks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    habit_id = Column(Integer, ForeignKey("habits.id"))
    current_streak = Column(Integer, default=0)
    longest_streak = Column(Integer, default=0)
    last_completion_date = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="streaks")
    habit = relationship("Habit", back_populates="streaks")

class HabitCompletion(Base):
    __tablename__ = "habit_completions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    habit_id = Column(Integer, ForeignKey("habits.id"))
    completed_at = Column(DateTime(timezone=True), server_default=func.now())
    notes = Column(String, nullable=True)

    # Relationships
    habit = relationship("Habit", back_populates="completions")

class Reward(Base):
    __tablename__ = "rewards"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(String)
    points_cost = Column(Integer)
    is_redeemed = Column(Boolean, default=False)
    redeemed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="rewards")

class Badge(Base):
    __tablename__ = "badges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True)
    description = Column(String)
    icon = Column(String)  # URL or emoji
    points_value = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

# Association table for many-to-many relationship between users and badges
user_badges = Table(
    "user_badges",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("badge_id", Integer, ForeignKey("badges.id")),
) 