import React, { useState } from 'react';
import {
  Box,
  Typography,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import { Category } from '../types';

interface SidebarProps {
  className?: string;
  userCategories?: Category[];
  allCategories?: Category[];
  onMyTasksClick?: () => void;
  onExecutionsClick?: () => void;
  onCategoryClick?: (category: Category) => void;
  activeItem?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  className,
  userCategories,
  allCategories,
  onMyTasksClick,
  onExecutionsClick,
  onCategoryClick,
  activeItem
}) => {
  const { t } = useLanguage();
  const [openExecutions, setOpenExecutions] = useState(true);
  const [openCategories, setOpenCategories] = useState(true);

  return (
    <Box
      className={className}
      sx={{
        backgroundColor: '#FFFFFF', 
        borderRadius: '16px', 
        border: '1px solid #E0E0E0',
        overflow: 'hidden',
      }}
    >
      <List sx={{ py: 0 }}>
        {/* My Tasks */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={onMyTasksClick}
            sx={{
              py: 1.5,
              px: 2,
              borderBottom: '1px solid #E0E0E0',
              '&:hover': {
                backgroundColor: '#F5F5F5',
              },
            }}
          >
            <AssignmentIcon sx={{ mr: 1.5, color: '#2196F3', fontSize: 20 }} />
            <ListItemText 
              primary={t('home.my_tasks')}
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            />
          </ListItemButton>
        </ListItem>

        {/* Executions Section - Only if user has categories */}
        {userCategories && userCategories.length > 0 && (
          <ListItem disablePadding>
            <ListItemButton
              onClick={onExecutionsClick}
              sx={{
                py: 1.5,
                px: 2,
                borderBottom: '1px solid #E0E0E0',
                '&:hover': {
                  backgroundColor: '#F5F5F5',
                },
              }}
            >
              <WorkIcon sx={{ mr: 1.5, color: '#4CAF50', fontSize: 20 }} />
              <ListItemText 
                primary={t('executor.executions')}
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        )}

        {/* Categories Section */}
        {allCategories && allCategories.length > 0 && (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setOpenCategories(!openCategories)}
                sx={{
                  py: 1.5,
                  px: 2,
                  borderBottom: '1px solid #E0E0E0',
                  '&:hover': {
                    backgroundColor: '#F5F5F5',
                  },
                }}
              >
                <CategoryIcon sx={{ mr: 1.5, color: '#FF9800', fontSize: 20 }} />
                <ListItemText 
                  primary={t('home.categories')}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                />
                {openCategories ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openCategories} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ backgroundColor: '#FAFAFA' }}>
                {allCategories.map((category) => (
                  <ListItem key={category.id} disablePadding>
                    <ListItemButton
                      onClick={() => onCategoryClick?.(category)}
                      sx={{
                        pl: 5,
                        py: 1,
                        borderBottom: '1px solid #F0F0F0',
                        backgroundColor: activeItem === `category-${category.name}` ? `${category.color}15` : 'transparent',
                        borderLeft: activeItem === `category-${category.name}` ? `3px solid ${category.color}` : '3px solid transparent',
                        '&:hover': {
                          backgroundColor: `${category.color}10`,
                          borderLeft: `3px solid ${category.color}`,
                        },
                      }}
                    >
                      <ListItemText 
                        primary={category.name}
                        primaryTypographyProps={{
                          fontSize: '0.875rem',
                          color: activeItem === `category-${category.name}` ? category.color : '#666',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;

