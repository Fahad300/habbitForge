from pydantic import BaseModel, EmailStr, constr
from typing import Optional, List
from datetime import datetime
from models import HabitFrequency, HabitCategory

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: constr(min_length=3, max_length=50)

class UserCreate(UserBase):
    password: constr(min_length=8)

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int
    is_active: bool
    points: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Habit Schemas
class HabitBase(BaseModel):
    title: constr(min_length=1, max_length=100)
    description: Optional[str] = None
    frequency: HabitFrequency
    category: HabitCategory

class HabitCreate(HabitBase):
    pass

class Habit(HabitBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Streak Schemas
class StreakBase(BaseModel):
    habit_id: int
    current_streak: int
    longest_streak: int
    last_completion_date: Optional[datetime] = None

class StreakCreate(StreakBase):
    pass

class Streak(StreakBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Habit Completion Schemas
class HabitCompletionBase(BaseModel):
    habit_id: int
    notes: Optional[str] = None

class HabitCompletionCreate(HabitCompletionBase):
    pass

class HabitCompletion(HabitCompletionBase):
    id: int
    user_id: int
    completed_at: datetime

    class Config:
        from_attributes = True

# Reward Schemas
class RewardBase(BaseModel):
    title: constr(min_length=1, max_length=100)
    description: Optional[str] = None
    points_cost: int

class RewardCreate(RewardBase):
    pass

class Reward(RewardBase):
    id: int
    user_id: int
    is_redeemed: bool
    redeemed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Badge Schemas
class BadgeBase(BaseModel):
    title: constr(min_length=1, max_length=100)
    description: str
    icon: str
    points_value: int

class BadgeCreate(BadgeBase):
    pass

class Badge(BadgeBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None 